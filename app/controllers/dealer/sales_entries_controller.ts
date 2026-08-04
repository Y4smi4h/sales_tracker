import type { HttpContext } from '@adonisjs/core/http'
import SalesEntry from '#models/sales_entry'
import Town from '#models/town'
import Device from '#models/device'
import AuditLog from '#models/audit_log'
import { createSalesEntryValidator } from '#validators/sales_entry_validator'

async function findOrCreateTown(name: string) {
  const normalized = name.trim()
  let town = await Town.query()
    .whereRaw('LOWER(town_name) = ?', [normalized.toLowerCase()])
    .first()
  if (!town) {
    town = await Town.create({ townName: normalized, region: 'N/A', division: 'N/A' })
  }
  return town
}

async function findOrCreateDevice(marketingName: string, memory: string) {
  const normalizedName = marketingName.trim()
  const normalizedMemory = memory.trim()
  let device = await Device.query()
    .whereRaw('LOWER(marketing_name) = ?', [normalizedName.toLowerCase()])
    .whereRaw('LOWER(memory) = ?', [normalizedMemory.toLowerCase()])
    .first()
  if (!device) {
    device = await Device.create({ marketingName: normalizedName, memory: normalizedMemory })
  }
  return device
}

export default class SalesEntriesController {
  async index({ auth, view }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().preload('town').firstOrFail()
    const entries = await SalesEntry.query()
      .where('dealer_id', dealer.id)
      .preload('lines', (q) => q.preload('device'))
      .orderBy('created_at', 'desc')

    const rows = []
    for (const entry of entries) {
      for (const line of entry.lines) {
        rows.push({
          entryId: entry.id,
          supplierName: entry.supplierName && entry.supplierName !== 'NaN' ? entry.supplierName : '-',
          customerName: entry.customerName,
          modelName: `${line.device.marketingName} (${line.device.memory})`,
          quantity: line.quantity,
          imei: line.imei ?? '-',
          createdAt: entry.createdAt.toFormat('dd/MM/yyyy HH:mm'),
        })
      }
    }

    return view.render('dealer/sales_entries/index', {
      rows,
      pgUsername: auth.user!.username ?? auth.user!.email,
      pgTown: dealer.town ? dealer.town.townName : null,
    })
  }

  async create({ view }: HttpContext) {
    return view.render('dealer/sales_entries/create')
  }

  async store({ auth, request, response, session }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const payload = await request.validateUsing(createSalesEntryValidator)

    const town = await findOrCreateTown(payload.town_name)

    for (const line of payload.lines) {
      const device = await findOrCreateDevice(line.marketing_name, line.memory)

      const entry = await SalesEntry.create({
        dealerId: dealer.id,
        customerName: payload.customer_name,
        townId: town.id,
        supplierName: payload.supplier_name || null,
        createdBy: auth.user!.id,
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
    return response.redirect('/dealer/sales-entries')
  }

  async edit({ auth, params, view }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const entry = await SalesEntry.query()
      .where('id', params.id)
      .where('dealer_id', dealer.id)
      .preload('town')
      .preload('lines', (q) => q.preload('device'))
      .firstOrFail()

    return view.render('dealer/sales_entries/edit', { entry })
  }

  async update({ auth, params, request, response, session }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const entry = await SalesEntry.query()
      .where('id', params.id)
      .where('dealer_id', dealer.id)
      .firstOrFail()

    const payload = request.only(['customer_name', 'supplier_name', 'town_name'])
    const town = await findOrCreateTown(payload.town_name)

    entry.customerName = payload.customer_name
    entry.supplierName = payload.supplier_name || null
    entry.townId = town.id
    await entry.save()

    await AuditLog.create({
      userId: auth.user!.id,
      action: 'update',
      entity: 'sales_entry',
      entityId: entry.id,
    })

    session.flash('success', 'Sale updated successfully')
    return response.redirect('/dealer/sales-entries')
  }

  async destroy({ auth, params, response, session }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const entry = await SalesEntry.query()
      .where('id', params.id)
      .where('dealer_id', dealer.id)
      .firstOrFail()

    await entry.related('lines').query().delete()
    await entry.delete()

    await AuditLog.create({
      userId: auth.user!.id,
      action: 'delete',
      entity: 'sales_entry',
      entityId: params.id,
    })

    session.flash('success', 'Sale deleted successfully')
    return response.redirect('/dealer/sales-entries')
  }
}