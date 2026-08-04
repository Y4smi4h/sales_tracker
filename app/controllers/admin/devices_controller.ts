import type { HttpContext } from '@adonisjs/core/http'
import Device from '#models/device'

export default class DevicesController {
  async index({ view }: HttpContext) {
    const devices = await Device.query().orderBy('marketing_name')
    return view.render('admin/devices/index', { devices })
  }

  async create({ view }: HttpContext) {
    return view.render('admin/devices/create')
  }

  async store({ request, response }: HttpContext) {
    const { marketing_name, memory } = request.only(['marketing_name', 'memory'])
    await Device.create({ marketingName: marketing_name, memory })
    return response.redirect('/admin/devices')
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const device = await Device.findOrFail(params.id)
      await device.delete()
      session.flash('success', 'Device deleted successfully')
    } catch (error) {
      session.flash('error', 'Cannot delete: this device is used by existing sales')
    }
    return response.redirect('/admin/devices')
  }
}