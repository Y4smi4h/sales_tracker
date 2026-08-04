import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class DealerMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    if (auth.user?.role !== 'dealer') {
      return response.forbidden({ message: 'Dealers only' })
    }
    return next()
  }
}
