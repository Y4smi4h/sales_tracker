import ExcelJS from 'exceljs'

interface PgRow {
  supplierName: string
  customerName: string
  modelName: string
  quantity: number
  createdAt: string
  townName: string
}

interface AllSalesRow extends PgRow {
  pgUsername: string
  imei: string
}

export default class ExcelExportService {
  async exportPgRows(rows: PgRow[]) {
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Sales')

    sheet.addRow(['Supplier', 'Customer', 'Model', 'Quantity', 'Date', 'Town'])
    sheet.getRow(1).font = { bold: true }

    for (const row of rows) {
      sheet.addRow([row.supplierName, row.customerName, row.modelName, row.quantity, row.createdAt, row.townName])
    }

    sheet.columns.forEach((col) => (col.width = 22))
    return workbook
  }

  async exportAllSalesRows(rows: AllSalesRow[]) {
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('All Sales')

    sheet.addRow(['PG', 'Supplier', 'Customer', 'Model', 'Quantity', 'Date', 'Town', 'IMEI'])
    sheet.getRow(1).font = { bold: true }

    for (const row of rows) {
      sheet.addRow([
        row.pgUsername,
        row.supplierName,
        row.customerName,
        row.modelName,
        row.quantity,
        row.createdAt,
        row.townName,
        row.imei,
      ])
    }

    sheet.columns.forEach((col) => (col.width = 22))
    return workbook
  }
}