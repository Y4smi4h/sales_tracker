/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.show_signup': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.show_signup']['types'],
  },
  'auth.signup': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.signup']['types'],
  },
  'lookups.towns': {
    methods: ["GET","HEAD"],
    pattern: '/towns',
    tokens: [{"old":"/towns","type":0,"val":"towns","end":""}],
    types: placeholder as Registry['lookups.towns']['types'],
  },
  'lookups.devices': {
    methods: ["GET","HEAD"],
    pattern: '/devices',
    tokens: [{"old":"/devices","type":0,"val":"devices","end":""}],
    types: placeholder as Registry['lookups.devices']['types'],
  },
  'dealer.sales_entries.index': {
    methods: ["GET","HEAD"],
    pattern: '/dealer/sales-entries',
    tokens: [{"old":"/dealer/sales-entries","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries","type":0,"val":"sales-entries","end":""}],
    types: placeholder as Registry['dealer.sales_entries.index']['types'],
  },
  'dealer.sales_entries.create': {
    methods: ["GET","HEAD"],
    pattern: '/dealer/sales-entries/create',
    tokens: [{"old":"/dealer/sales-entries/create","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries/create","type":0,"val":"sales-entries","end":""},{"old":"/dealer/sales-entries/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['dealer.sales_entries.create']['types'],
  },
  'dealer.sales_entries.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dealer/sales-entries/:id/edit',
    tokens: [{"old":"/dealer/sales-entries/:id/edit","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries/:id/edit","type":0,"val":"sales-entries","end":""},{"old":"/dealer/sales-entries/:id/edit","type":1,"val":"id","end":""},{"old":"/dealer/sales-entries/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['dealer.sales_entries.edit']['types'],
  },
  'dealer.sales_entries.update': {
    methods: ["POST"],
    pattern: '/dealer/sales-entries/:id/update',
    tokens: [{"old":"/dealer/sales-entries/:id/update","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries/:id/update","type":0,"val":"sales-entries","end":""},{"old":"/dealer/sales-entries/:id/update","type":1,"val":"id","end":""},{"old":"/dealer/sales-entries/:id/update","type":0,"val":"update","end":""}],
    types: placeholder as Registry['dealer.sales_entries.update']['types'],
  },
  'dealer.sales_entries.store': {
    methods: ["POST"],
    pattern: '/dealer/sales-entries',
    tokens: [{"old":"/dealer/sales-entries","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries","type":0,"val":"sales-entries","end":""}],
    types: placeholder as Registry['dealer.sales_entries.store']['types'],
  },
  'dealer.sales_entries.destroy': {
    methods: ["POST"],
    pattern: '/dealer/sales-entries/:id/delete',
    tokens: [{"old":"/dealer/sales-entries/:id/delete","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries/:id/delete","type":0,"val":"sales-entries","end":""},{"old":"/dealer/sales-entries/:id/delete","type":1,"val":"id","end":""},{"old":"/dealer/sales-entries/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['dealer.sales_entries.destroy']['types'],
  },
  'dealer.sales_entries.export': {
    methods: ["GET","HEAD"],
    pattern: '/dealer/sales-entries/export',
    tokens: [{"old":"/dealer/sales-entries/export","type":0,"val":"dealer","end":""},{"old":"/dealer/sales-entries/export","type":0,"val":"sales-entries","end":""},{"old":"/dealer/sales-entries/export","type":0,"val":"export","end":""}],
    types: placeholder as Registry['dealer.sales_entries.export']['types'],
  },
  'admin.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin/dashboard',
    tokens: [{"old":"/admin/dashboard","type":0,"val":"admin","end":""},{"old":"/admin/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['admin.dashboard']['types'],
  },
  'admin.dealers.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/dealers',
    tokens: [{"old":"/admin/dealers","type":0,"val":"admin","end":""},{"old":"/admin/dealers","type":0,"val":"dealers","end":""}],
    types: placeholder as Registry['admin.dealers.index']['types'],
  },
  'admin.dealers.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/dealers/create',
    tokens: [{"old":"/admin/dealers/create","type":0,"val":"admin","end":""},{"old":"/admin/dealers/create","type":0,"val":"dealers","end":""},{"old":"/admin/dealers/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.dealers.create']['types'],
  },
  'admin.dealers.store': {
    methods: ["POST"],
    pattern: '/admin/dealers',
    tokens: [{"old":"/admin/dealers","type":0,"val":"admin","end":""},{"old":"/admin/dealers","type":0,"val":"dealers","end":""}],
    types: placeholder as Registry['admin.dealers.store']['types'],
  },
  'admin.dealers.destroy': {
    methods: ["POST"],
    pattern: '/admin/dealers/:id/delete',
    tokens: [{"old":"/admin/dealers/:id/delete","type":0,"val":"admin","end":""},{"old":"/admin/dealers/:id/delete","type":0,"val":"dealers","end":""},{"old":"/admin/dealers/:id/delete","type":1,"val":"id","end":""},{"old":"/admin/dealers/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.dealers.destroy']['types'],
  },
  'admin.towns.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/towns',
    tokens: [{"old":"/admin/towns","type":0,"val":"admin","end":""},{"old":"/admin/towns","type":0,"val":"towns","end":""}],
    types: placeholder as Registry['admin.towns.index']['types'],
  },
  'admin.towns.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/towns/create',
    tokens: [{"old":"/admin/towns/create","type":0,"val":"admin","end":""},{"old":"/admin/towns/create","type":0,"val":"towns","end":""},{"old":"/admin/towns/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.towns.create']['types'],
  },
  'admin.towns.store': {
    methods: ["POST"],
    pattern: '/admin/towns',
    tokens: [{"old":"/admin/towns","type":0,"val":"admin","end":""},{"old":"/admin/towns","type":0,"val":"towns","end":""}],
    types: placeholder as Registry['admin.towns.store']['types'],
  },
  'admin.towns.destroy': {
    methods: ["POST"],
    pattern: '/admin/towns/:id/delete',
    tokens: [{"old":"/admin/towns/:id/delete","type":0,"val":"admin","end":""},{"old":"/admin/towns/:id/delete","type":0,"val":"towns","end":""},{"old":"/admin/towns/:id/delete","type":1,"val":"id","end":""},{"old":"/admin/towns/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.towns.destroy']['types'],
  },
  'admin.devices.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/devices',
    tokens: [{"old":"/admin/devices","type":0,"val":"admin","end":""},{"old":"/admin/devices","type":0,"val":"devices","end":""}],
    types: placeholder as Registry['admin.devices.index']['types'],
  },
  'admin.devices.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/devices/create',
    tokens: [{"old":"/admin/devices/create","type":0,"val":"admin","end":""},{"old":"/admin/devices/create","type":0,"val":"devices","end":""},{"old":"/admin/devices/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.devices.create']['types'],
  },
  'admin.devices.store': {
    methods: ["POST"],
    pattern: '/admin/devices',
    tokens: [{"old":"/admin/devices","type":0,"val":"admin","end":""},{"old":"/admin/devices","type":0,"val":"devices","end":""}],
    types: placeholder as Registry['admin.devices.store']['types'],
  },
  'admin.devices.destroy': {
    methods: ["POST"],
    pattern: '/admin/devices/:id/delete',
    tokens: [{"old":"/admin/devices/:id/delete","type":0,"val":"admin","end":""},{"old":"/admin/devices/:id/delete","type":0,"val":"devices","end":""},{"old":"/admin/devices/:id/delete","type":1,"val":"id","end":""},{"old":"/admin/devices/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.devices.destroy']['types'],
  },
  'admin.sales_entries.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/sales-entries',
    tokens: [{"old":"/admin/sales-entries","type":0,"val":"admin","end":""},{"old":"/admin/sales-entries","type":0,"val":"sales-entries","end":""}],
    types: placeholder as Registry['admin.sales_entries.index']['types'],
  },
  'admin.sales_entries.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/sales-entries/create',
    tokens: [{"old":"/admin/sales-entries/create","type":0,"val":"admin","end":""},{"old":"/admin/sales-entries/create","type":0,"val":"sales-entries","end":""},{"old":"/admin/sales-entries/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.sales_entries.create']['types'],
  },
  'admin.sales_entries.store': {
    methods: ["POST"],
    pattern: '/admin/sales-entries',
    tokens: [{"old":"/admin/sales-entries","type":0,"val":"admin","end":""},{"old":"/admin/sales-entries","type":0,"val":"sales-entries","end":""}],
    types: placeholder as Registry['admin.sales_entries.store']['types'],
  },
  'admin.sales_entries.destroy': {
    methods: ["POST"],
    pattern: '/admin/sales-entries/:id/delete',
    tokens: [{"old":"/admin/sales-entries/:id/delete","type":0,"val":"admin","end":""},{"old":"/admin/sales-entries/:id/delete","type":0,"val":"sales-entries","end":""},{"old":"/admin/sales-entries/:id/delete","type":1,"val":"id","end":""},{"old":"/admin/sales-entries/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.sales_entries.destroy']['types'],
  },
  'admin.sales_entries.export': {
    methods: ["GET","HEAD"],
    pattern: '/admin/sales-entries/export',
    tokens: [{"old":"/admin/sales-entries/export","type":0,"val":"admin","end":""},{"old":"/admin/sales-entries/export","type":0,"val":"sales-entries","end":""},{"old":"/admin/sales-entries/export","type":0,"val":"export","end":""}],
    types: placeholder as Registry['admin.sales_entries.export']['types'],
  },
  'admin.sales_entries.export_dealer': {
    methods: ["GET","HEAD"],
    pattern: '/admin/sales-entries/export/:dealerId',
    tokens: [{"old":"/admin/sales-entries/export/:dealerId","type":0,"val":"admin","end":""},{"old":"/admin/sales-entries/export/:dealerId","type":0,"val":"sales-entries","end":""},{"old":"/admin/sales-entries/export/:dealerId","type":0,"val":"export","end":""},{"old":"/admin/sales-entries/export/:dealerId","type":1,"val":"dealerId","end":""}],
    types: placeholder as Registry['admin.sales_entries.export_dealer']['types'],
  },
  'admin.audit_logs.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/audit-logs',
    tokens: [{"old":"/admin/audit-logs","type":0,"val":"admin","end":""},{"old":"/admin/audit-logs","type":0,"val":"audit-logs","end":""}],
    types: placeholder as Registry['admin.audit_logs.index']['types'],
  },
  'admin.users.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users',
    tokens: [{"old":"/admin/users","type":0,"val":"admin","end":""},{"old":"/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.users.index']['types'],
  },
  'admin.users.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users/create',
    tokens: [{"old":"/admin/users/create","type":0,"val":"admin","end":""},{"old":"/admin/users/create","type":0,"val":"users","end":""},{"old":"/admin/users/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.users.create']['types'],
  },
  'admin.users.store': {
    methods: ["POST"],
    pattern: '/admin/users',
    tokens: [{"old":"/admin/users","type":0,"val":"admin","end":""},{"old":"/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.users.store']['types'],
  },
  'admin.users.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users/:id/edit',
    tokens: [{"old":"/admin/users/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/users/:id/edit","type":0,"val":"users","end":""},{"old":"/admin/users/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/users/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.users.edit']['types'],
  },
  'admin.users.update': {
    methods: ["POST"],
    pattern: '/admin/users/:id/update',
    tokens: [{"old":"/admin/users/:id/update","type":0,"val":"admin","end":""},{"old":"/admin/users/:id/update","type":0,"val":"users","end":""},{"old":"/admin/users/:id/update","type":1,"val":"id","end":""},{"old":"/admin/users/:id/update","type":0,"val":"update","end":""}],
    types: placeholder as Registry['admin.users.update']['types'],
  },
  'admin.users.destroy': {
    methods: ["POST"],
    pattern: '/admin/users/:id/delete',
    tokens: [{"old":"/admin/users/:id/delete","type":0,"val":"admin","end":""},{"old":"/admin/users/:id/delete","type":0,"val":"users","end":""},{"old":"/admin/users/:id/delete","type":1,"val":"id","end":""},{"old":"/admin/users/:id/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['admin.users.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
