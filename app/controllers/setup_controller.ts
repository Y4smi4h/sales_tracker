import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

/**
 * Temporary, token-protected endpoint to create or reset the admin
 * account when shell/console access is not available (e.g. Render
 * free tier). Remove this controller and its route once no longer
 * needed.
 */
export default class SetupController {
  async createAdmin({ request, response }: HttpContext) {
    const token = request.input('token')

    if (!token || !process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
      return response.notFound('Not found')
    }

    const email = request.input('email', 'youwayasmina@gmail.com')
    const password = request.input('password', 'password123')
    const username = request.input('username', 'Admin')

    let user = await User.findBy('email', email)

    if (user) {
      user.password = password
      user.role = 'admin'
      user.username = username
      await user.save()
      return response.ok({ status: 'updated', email })
    }

    user = await User.create({
      email,
      password,
      username,
      fullName: username,
      role: 'admin',
    })

    return response.ok({ status: 'created', email })
  }
}
