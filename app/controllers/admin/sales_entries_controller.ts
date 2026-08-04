import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import SalesEntry from '#models/sales_entry'
import Dealer from '#models/dealer'
import Town from '#models/town'
import Device from '#models/device'
import AuditLog from '#models/audit_log'

export default class SalesEntriesController {
  async index({ view, request }: HttpContext) {
    const search = (request.input('search') || '').toLowerCase().trim()
    const dateFrom = request.input('date_from')
    const dateTo = request.input('date_to')

    const dealers = await Dealer.query().preload('user')

    const allRows = []
    const groups = []

    for (const dealer of dealers) {
      const pgName = dealer.user.username || dealer.user.email

      let query = SalesEntry.query()
        .where('dealer_id', dealer.id)
        .preload('town')
        .preload('lines', (q) => q.preload('device'))
        .orderBy('created_at', 'desc')

      if (dateFrom) query = query.where('created_at', '>=', dateFrom)
      if (dateTo) query = query.where('created_at', '<=', DateTime.fromISO(dateTo).endOf('day').toSQL()!)

      const entries = await query

      const groupRows = []
      for (const entry of entries) {
        for (const line of entry.lines) {
          const searchable = `${entry.customerName} ${pgName} ${line.device.marketingName}`.toLowerCase()
          if (search && !searchable.includes(search)) continue

          const pgRow = {
            supplierName: entry.supplierName && entry.supplierName !== 'NaN' ? entry.supplierName : '-',
            customerName: entry.customerName,
            modelName: `${line.device.marketingName} (${line.device.memory})`,
            quantity: line.quantity,
            createdAt: entry.createdAt.toFormat('dd/MM/yyyy HH:mm'),
            townName: entry.town.townName,
          }
          groupRows.push(pgRow)
          allRows.push({ ...pgRow, pgName, imei: line.imei ?? '-', entryId: entry.id })
        }
      }

      if (groupRows.length > 0) {
        groups.push({ dealerId: dealer.id, pgName, rows: groupRows })
      }
    }

    return view.render('admin/sales_entries/index', {
      allRows,
      groups,
      search: request.input('search') || '',
      dateFrom: dateFrom || '',
      dateTo: dateTo || '',
    })
  }

  async create({ view }: HttpContext) {
    const dealers = await Dealer.query().preload('user')
    return view.render('admin/sales_entries/create', { dealers })
  }

  async store({ auth, request, response, session }: HttpContext) {
    const payload = request.only(['dealer_id', 'customer_name', 'town_name', 'supplier_name', 'lines'])

    const normalizedTown = payload.town_name.trim()
    let town = await Town.query()
      .whereRaw('LOWER(town_name) = ?', [normalizedTown.toLowerCase()])
      .first()
    if (!town) {
      town = await Town.create({ townName: normalizedTown, region: 'N/A', division: 'N/A' })
    }

    for (const line of payload.lines) {
      if (!line.marketing_name || !line.quantity) continue

      const normalizedName = line.marketing_name.trim()
      const normalizedMemory = (line.memory || '').trim()
      let device = await Device.query()
        .whereRaw('LOWER(marketing_name) = ?', [normalizedName.toLowerCase()])
        .whereRaw('LOWER(memory) = ?', [normalizedMemory.toLowerCase()])
        .first()
      if (!device) {
        device = await Device.create({ marketingName: normalizedName, memory: normalizedMemory })
      }

      const entry = await SalesEntry.create({
        dealerId: payload.dealer_id,
        customerName: payload.customer_name,
        townId: town.id,
        supplierName: payload.supplier_name || null,
      })

      await entry.related('lines').create({
        deviceId: device.id,
        imei: line.imei || null,
        quantity: line.quantity,
      })

      await AuditLog.create({
        userId: auth.user!.id,
        action: 'create',
        entity: 'sales_entry',
        entityId: entry.id,
      })
    }

    session.flash('success', 'Sale recorded successfully')
    return response.redirect('/admin/sales-entries')
  }

  async destroy({ auth, params, response, session }: HttpContext) {
    const entry = await SalesEntry.findOrFail(params.id)
    await entry.related('lines').query().delete()
    await entry.delete()

    await AuditLog.create({
      userId: auth.user!.id,
      action: 'delete',
      entity: 'sales_entry',
      entityId: params.id,
    })

    session.flash('success', 'Sale deleted successfully')
    return response.redirect('/admin/sales-entries')
  }
}