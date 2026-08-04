import AuditLog from '#models/audit_log'

export default class AuditService {
  static async log(
    userId: number | null,
    action: 'created' | 'updated' | 'deleted',
    entity: string,
    entityId: number,
    changes: Record<string, unknown> | null
  ) {
    await AuditLog.create({
      userId,
      action,
      entity,
      entityId,
      changes,
    })
  }
}
