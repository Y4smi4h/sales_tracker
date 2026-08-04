import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Dealer from '#models/dealer'
import SalesEntry from '#models/sales_entry'

export default class UsersController {
  async index({ view }: HttpContext) {
    const users = await User.query().orderBy('id', 'desc')
    return view.render('admin/users/index', { users })
  }

  async create({ view }: HttpContext) {
    return view.render('admin/users/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = request.only(['username', 'email', 'password', 'role'])

    const user = await User.create({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    })

    if (payload.role === 'dealer') {
      await Dealer.create({ userId: user.id })
    }

    session.flash('success', 'User created successfully')
    return response.redirect('/admin/users')
  }

  async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return view.render('admin/users/edit', { user })
  }

  async update({ params, request, response, session }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = request.only(['username', 'email', 'password', 'role'])

    user.username = payload.username
    user.email = payload.email
    user.role = payload.role
    if (payload.password) {
      user.password = payload.password
    }
    await user.save()

    session.flash('success', 'User updated successfully')
    return response.redirect('/admin/users')
  }

  async destroy({ params, auth, response, session }: HttpContext) {
    if (Number(params.id) === auth.user!.id) {
      session.flash('error', 'You cannot delete your own account')
      return response.redirect('/admin/users')
    }

    const user = await User.findOrFail(params.id)
    const dealer = await Dealer.query().where('user_id', user.id).first()

    if (dealer) {
      const entries = await SalesEntry.query().where('dealer_id', dealer.id)
      for (const entry of entries) {
        await entry.related('lines').query().delete()
        await entry.delete()
      }
      await dealer.delete()
    }

    await user.delete()

    session.flash('success', 'User deleted successfully')
    return response.redirect('/admin/users')
  }
}