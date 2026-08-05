import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales_lines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('sales_entry_id').unsigned().references('id').inTable('sales_entries').onDelete('CASCADE')
      table.integer('device_id').unsigned().references('id').inTable('devices')
      table.string('imei').nullable()
      table.integer('quantity').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}