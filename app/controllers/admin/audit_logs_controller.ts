import type { HttpContext } from '@adonisjs/core/http'
import AuditLog from '#models/audit_log'

export default class AuditLogsController {
  async index({ view }: HttpContext) {
    const logs = await AuditLog.query().preload('user').orderBy('created_at', 'desc')
    return view.render('admin/audit_logs/index', { logs })
  }
}