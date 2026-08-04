import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Town extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare townName: string

  @column()
  declare region: string

  @column()
  declare division: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
