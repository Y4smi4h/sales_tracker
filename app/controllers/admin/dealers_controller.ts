import type { HttpContext } from '@adonisjs/core/http'
import Dealer from '#models/dealer'
import Town from '#models/town'
import User from '#models/user'

export default class DealersController {
  async index({ view }: HttpContext) {
    const dealers = await Dealer.query().preload('user').preload('town').orderBy('created_at', 'desc')
    return view.render('admin/dealers/index', { dealers })
  }

  async create({ view }: HttpContext) {
    const towns = await Town.all()
    return view.render('admin/dealers/create', { towns })
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'username',
      'email',
      'password',
      'shop_name',
      'dealer_category',
      'town_id',
      'location',
      'owner_name',
      'phone_number',
    ])

    const user = await User.create({
      fullName: payload.username,
      username: payload.username,
      email: payload.email,
      password: payload.password,
      role: 'dealer',
      isActive: true,
    })

    await Dealer.create({
      userId: user.id,
      shopName: payload.shop_name,
      dealerCategory: payload.dealer_category || null,
      townId: payload.town_id,
      location: payload.location || null,
      ownerName: payload.owner_name,
      phoneNumber: payload.phone_number,
    })

    return response.redirect('/admin/dealers')
  }

  async destroy({ params, response }: HttpContext) {
    const dealer = await Dealer.findOrFail(params.id)
    const user = await User.find(dealer.userId)

    await dealer.delete()
    if (user) await user.delete()

    return response.redirect('/admin/dealers')
  }