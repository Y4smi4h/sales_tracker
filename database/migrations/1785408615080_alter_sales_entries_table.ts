import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales_entries'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('supplier_name').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('supplier_name')
    })
  }
}