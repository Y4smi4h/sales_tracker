import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dealers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('shop_name').notNullable()
      table.string('dealer_category').nullable()
      table.integer('town_id').unsigned().references('id').inTable('towns')
      table.string('location').nullable()
      table.string('owner_name').notNullable()
      table.string('phone_number').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
