import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Home
router.get('/', async ({ view }) => view.render('home'))

// Temporary admin bootstrap (token-protected, see setup_controller.ts)
router.get('/internal/setup-admin', '#controllers/setup_controller.createAdmin')

// Auth
router.get('/test-edge', async ({ view }) => view.render('test'))

router.get('/login', async ({ view }) => {
  return view.render('auth/login')
})
router.post('/login', '#controllers/auth_controller.login')
router.post('/logout', '#controllers/auth_controller.logout')

router.get('/signup', '#controllers/auth_controller.showSignup')
router.post('/signup', '#controllers/auth_controller.signup')

// Shared lookups
router.get('/towns', '#controllers/shared/lookups_controller.towns').use(middleware.auth())
router.get('/devices', '#controllers/shared/lookups_controller.devices').use(middleware.auth())

// Dealer area
router
  .group(() => {
    router.get('/sales-entries', '#controllers/dealer/sales_entries_controller.index').as('dealer.sales_entries.index')
    router.get('/sales-entries/create', '#controllers/dealer/sales_entries_controller.create').as('dealer.sales_entries.create')
    router.get('/sales-entries/:id/edit', '#controllers/dealer/sales_entries_controller.edit').as('dealer.sales_entries.edit')
    router.post('/sales-entries/:id/update', '#controllers/dealer/sales_entries_controller.update').as('dealer.sales_entries.update')
    router.get('/dashboard', '#controllers/dealer/sales_entries_controller.dashboard').as('dealer.dashboard')
    router.post('/sales-entries', '#controllers/dealer/sales_entries_controller.store').as('dealer.sales_entries.store')
    router.post('/sales-entries/:id/delete', '#controllers/dealer/sales_entries_controller.destroy').as('dealer.sales_entries.destroy')
    router.get('/sales-entries/export', '#controllers/dealer/export_controller.exportExcel').as('dealer.sales_entries.export')
  })
  .prefix('/dealer')
  .use([middleware.auth(), middleware.dealer()])

// Admin area
router
  .group(() => {
    router.get('/dashboard', '#controllers/admin/dashboard_controller.index').as('admin.dashboard')

    router.get('/dealers', '#controllers/admin/dealers_controller.index').as('admin.dealers.index')
    router.get('/dealers/create', '#controllers/admin/dealers_controller.create').as('admin.dealers.create')
    router.post('/dealers', '#controllers/admin/dealers_controller.store').as('admin.dealers.store')
    router.post('/dealers/:id/delete', '#controllers/admin/dealers_controller.destroy').as('admin.dealers.destroy')

    router.get('/towns', '#controllers/admin/towns_controller.index').as('admin.towns.index')
    router.get('/towns/create', '#controllers/admin/towns_controller.create').as('admin.towns.create')
    router.post('/towns', '#controllers/admin/towns_controller.store').as('admin.towns.store')
    router.post('/towns/:id/delete', '#controllers/admin/towns_controller.destroy').as('admin.towns.destroy')

    router.get('/devices', '#controllers/admin/devices_controller.index').as('admin.devices.index')
    router.get('/devices/create', '#controllers/admin/devices_controller.create').as('admin.devices.create')
    router.post('/devices', '#controllers/admin/devices_controller.store').as('admin.devices.store')
    router.post('/devices/:id/delete', '#controllers/admin/devices_controller.destroy').as('admin.devices.destroy')

    router.get('/sales-entries', '#controllers/admin/sales_entries_controller.index').as('admin.sales_entries.index')
    router.get('/sales-entries/create', '#controllers/admin/sales_entries_controller.create').as('admin.sales_entries.create')
    router.post('/sales-entries', '#controllers/admin/sales_entries_controller.store').as('admin.sales_entries.store')
    router.post('/sales-entries/:id/delete', '#controllers/admin/sales_entries_controller.destroy').as('admin.sales_entries.destroy')
    router.get('/sales-entries/export', '#controllers/admin/export_controller.exportExcel').as('admin.sales_entries.export')
    router.get('/sales-entries/export/:dealerId', '#controllers/admin/export_controller.exportForDealer').as('admin.sales_entries.export_dealer')

    router.get('/audit-logs', '#controllers/admin/audit_logs_controller.index').as('admin.audit_logs.index')

    router.get('/users', '#controllers/admin/users_controller.index').as('admin.users.index')
    router.get('/users/create', '#controllers/admin/users_controller.create').as('admin.users.create')
    router.post('/users', '#controllers/admin/users_controller.store').as('admin.users.store')
    router.get('/users/:id/edit', '#controllers/admin/users_controller.edit').as('admin.users.edit')
    router.post('/users/:id/update', '#controllers/admin/users_controller.update').as('admin.users.update')
    router.post('/users/:id/delete', '#controllers/admin/users_controller.destroy').as('admin.users.destroy')
  })
  .prefix('/admin')
  .use([middleware.auth(), middleware.admin()])
