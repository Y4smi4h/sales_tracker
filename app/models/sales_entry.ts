import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, afterCreate, afterUpdate, afterDelete } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Dealer from '#models/dealer'
import Town from '#models/town'
import SalesLine from '#models/sales_line'
import AuditService from '#services/audit_service'

export default class SalesEntry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dealerId: number

  @column()
  declare customerName: string

  @column()
  declare townId: number

  @column()
  declare createdBy: number

  @column()
declare supplierName: string | null

  @belongsTo(() => Dealer)
  declare dealer: BelongsTo<typeof Dealer>

  @belongsTo(() => Town)
  declare town: BelongsTo<typeof Town>

  @hasMany(() => SalesLine)
  declare lines: HasMany<typeof SalesLine>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  static async logCreate(entry: SalesEntry) {
    await AuditService.log(entry.createdBy, 'created', 'sales_entries', entry.id, entry.$attributes)
  }

  @afterUpdate()
  static async logUpdate(entry: SalesEntry) {
    await AuditService.log(entry.createdBy, 'updated', 'sales_entries', entry.id, entry.$attributes)
  }

  @afterDelete()
  static async logDelete(entry: SalesEntry) {
    await AuditService.log(entry.createdBy, 'deleted', 'sales_entries', entry.id, null)
  }
}
