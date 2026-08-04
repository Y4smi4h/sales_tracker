import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import SalesEntry from '#models/sales_entry'
import Device from '#models/device'

export default class SalesLine extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare salesEntryId: number

  @column()
  declare deviceId: number

  @column()
  declare imei: string | null

  @column()
  declare quantity: number

  @belongsTo(() => SalesEntry)
  declare salesEntry: BelongsTo<typeof SalesEntry>

  @belongsTo(() => Device)
  declare device: BelongsTo<typeof Device>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
