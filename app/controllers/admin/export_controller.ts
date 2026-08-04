import type { HttpContext } from '@adonisjs/core/http'
import Dealer from '#models/dealer'
import SalesEntry from '#models/sales_entry'
import ExcelExportService from '#services/excel_export_service'

export default class ExportController {
  async exportExcel({ response }: HttpContext) {
    const dealers = await Dealer.query().preload('user')
    const rows = []

    for (const dealer of dealers) {
      const pgName = dealer.user.username || dealer.user.email
      const entries = await SalesEntry.query()
        .where('dealer_id', dealer.id)
        .preload('town')
        .preload('lines', (q) => q.preload('device'))

      for (const entry of entries) {
        for (const line of entry.lines) {
          rows.push({
            pgUsername: pgName,
            supplierName: entry.supplierName && entry.supplierName !== 'NaN' ? entry.supplierName : '-',
            customerName: entry.customerName,
            modelName: `${line.device.marketingName} (${line.device.memory})`,
            quantity: line.quantity,
            createdAt: entry.createdAt.toFormat('dd/MM/yyyy HH:mm'),
            townName: entry.town.townName,
            imei: line.imei ?? '-',
          })
        }
      }
    }

    const service = new ExcelExportService()
    const workbook = await service.exportAllSalesRows(rows)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename="all_sales_entries.xlsx"')
    return response.send(await workbook.xlsx.writeBuffer())
  }

  async exportForDealer({ params, response }: HttpContext) {
    const dealer = await Dealer.query().where('id', params.dealerId).preload('user').firstOrFail()
    const entries = await SalesEntry.query()
      .where('dealer_id', params.dealerId)
      .preload('town')
      .preload('lines', (q) => q.preload('device'))

    const rows = []
    for (const entry of entries) {
      for (const line of entry.lines) {
        rows.push({
          supplierName: entry.supplierName && entry.supplierName !== 'NaN' ? entry.supplierName : '-',
          customerName: entry.customerName,
          modelName: `${line.device.marketingName} (${line.device.memory})`,
          quantity: line.quantity,
          createdAt: entry.createdAt.toFormat('dd/MM/yyyy HH:mm'),
          townName: entry.town.townName,
        })
      }
    }

    const service = new ExcelExportService()
    const workbook = await service.exportPgRows(rows)
    const pgName = (dealer.user.username || dealer.user.email).replace(/\s+/g, '_')

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', `attachment; filename="${pgName}_sales.xlsx"`)
    return response.send(await workbook.xlsx.writeBuffer())
  }
}