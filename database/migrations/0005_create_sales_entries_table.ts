import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales_entries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('dealer_id').unsigned().references('id').inTable('dealers').onDelete('CASCADE')
      table.string('customer_name').notNullable()
      table.integer('town_id').unsigned().references('id').inTable('towns')
      table.integer('created_by').unsigned().references('id').inTable('users').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}