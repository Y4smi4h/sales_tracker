import type { HttpContext } from '@adonisjs/core/http'
import Town from '#models/town'
import Device from '#models/device'

export default class LookupsController {
  async towns({ response }: HttpContext) {
    const towns = await Town.all()
    return response.json(towns)
  }

  async devices({ response }: HttpContext) {
    const devices = await Device.all()
    return response.json(devices)
  }
}