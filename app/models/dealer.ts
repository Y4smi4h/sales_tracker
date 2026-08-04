import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Town from '#models/town'

export default class Dealer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare shopName: string

  @column()
  declare dealerCategory: string | null

  @column()
  declare townId: number

  @column()
  declare location: string | null

  @column()
  declare ownerName: string

  @column()
  declare phoneNumber: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Town)
  declare town: BelongsTo<typeof Town>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
