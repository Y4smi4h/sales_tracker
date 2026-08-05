import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Dealer from '#models/dealer'
import Town from '#models/town'
import vine from '@vinejs/vine'
import { signupValidator } from '#validators/signup_validator'

const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
  })
)

export default class AuthController {
  async login({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect(user.role === 'admin' ? '/admin/dashboard' : '/dealer/dashboard')
    } catch {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  async showSignup({ view }: HttpContext) {
    return view.render('auth/signup')
  }

  async signup({ request, auth, response, session }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)

    const normalizedTownName = payload.town_name.trim()
    let town = await Town.query()
      .whereRaw('LOWER(town_name) = ?', [normalizedTownName.toLowerCase()])
      .first()
    if (!town) {
      town = await Town.create({ townName: normalizedTownName, region: 'N/A', division: 'N/A' })
    }

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      username: payload.username,
      role: 'dealer',
    })

    await Dealer.create({
      userId: user.id,
      townId: town.id,
      phoneNumber: payload.phone_number,
    })

    await auth.use('web').login(user)
    session.flash('success', 'Account created successfully')
    return response.redirect('/dealer/dashboard')
  }
}