import type { HttpContext } from '@adonisjs/core/http'
import SalesEntry from '#models/sales_entry'
import ExcelExportService from '#services/excel_export_service'

export default class ExportController {
  async exportExcel({ auth, response }: HttpContext) {
    const dealer = await auth.user!.related('dealer').query().firstOrFail()
    const entries = await SalesEntry.query()
      .where('dealer_id', dealer.id)
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

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename="my_sales.xlsx"')
    return response.send(await workbook.xlsx.writeBuffer())
  }
}