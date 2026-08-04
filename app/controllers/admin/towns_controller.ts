import type { HttpContext } from '@adonisjs/core/http'
import Town from '#models/town'

export default class TownsController {
  async index({ view }: HttpContext) {
    const towns = await Town.query().orderBy('town_name')
    return view.render('admin/towns/index', { towns })
  }

  async create({ view }: HttpContext) {
    return view.render('admin/towns/create')
  }

  async store({ request, response }: HttpContext) {
    const { town_name, region, division } = request.only(['town_name', 'region', 'division'])
    await Town.create({ townName: town_name, region, division })
    return response.redirect('/admin/towns')
  }

  async destroy({ params, response, session }: HttpContext) {
    try {
      const town = await Town.findOrFail(params.id)
      await town.delete()
      session.flash('success', 'Town deleted successfully')
    } catch (error) {
      session.flash('error', 'Cannot delete: this town is used by existing sales or PG records')
    }
    return response.redirect('/admin/towns')
  }
}