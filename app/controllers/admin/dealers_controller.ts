import type { HttpContext } from '@adonisjs/core/http'
import SalesEntry from '#models/sales_entry'
import Town from '#models/town'
import Device from '#models/device'

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

  async store({ auth, request, response }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const payload = request.only(['customer_name', 'town_name', 'supplier_name', 'lines'])

    const town = await Town.firstOrCreate(
      { townName: payload.town_name },
      { region: 'N/A', division: 'N/A' }
    )

    for (const line of payload.lines) {
      if (!line.marketing_name || !line.quantity) continue

      const device = await Device.firstOrCreate({
        marketingName: line.marketing_name,
        memory: line.memory,
      })

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
    }

    return response.redirect('/dealer/sales-entries')
  }

  async destroy({ auth, params, response }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const entry = await SalesEntry.query()
      .where('id', params.id)
      .where('dealer_id', dealer.id)
      .firstOrFail()

    await entry.related('lines').query().delete()
    await entry.delete()

    return response.redirect('/dealer/sales-entries')
  }
}