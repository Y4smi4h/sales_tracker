import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dealers'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('shop_name').nullable().alter()
      table.string('dealer_category').nullable().alter()
      table.string('location').nullable().alter()
      table.string('owner_name').nullable().alter()
      table.integer('town_id').unsigned().nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('shop_name').notNullable().alter()
    })
  }
}