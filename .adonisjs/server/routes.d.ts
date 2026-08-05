import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.show_signup': { paramsTuple?: []; params?: {} }
    'auth.signup': { paramsTuple?: []; params?: {} }
    'lookups.towns': { paramsTuple?: []; params?: {} }
    'lookups.devices': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.index': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.create': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dealer.sales_entries.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dealer.dashboard': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.store': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dealer.sales_entries.export': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.dealers.index': { paramsTuple?: []; params?: {} }
    'admin.dealers.create': { paramsTuple?: []; params?: {} }
    'admin.dealers.store': { paramsTuple?: []; params?: {} }
    'admin.dealers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.towns.index': { paramsTuple?: []; params?: {} }
    'admin.towns.create': { paramsTuple?: []; params?: {} }
    'admin.towns.store': { paramsTuple?: []; params?: {} }
    'admin.towns.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.devices.index': { paramsTuple?: []; params?: {} }
    'admin.devices.create': { paramsTuple?: []; params?: {} }
    'admin.devices.store': { paramsTuple?: []; params?: {} }
    'admin.devices.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.sales_entries.index': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.create': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.store': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.sales_entries.export': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.export_dealer': { paramsTuple: [ParamValue]; params: {'dealerId': ParamValue} }
    'admin.audit_logs.index': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'admin.users.create': { paramsTuple?: []; params?: {} }
    'admin.users.store': { paramsTuple?: []; params?: {} }
    'admin.users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.show_signup': { paramsTuple?: []; params?: {} }
    'lookups.towns': { paramsTuple?: []; params?: {} }
    'lookups.devices': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.index': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.create': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dealer.dashboard': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.export': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.dealers.index': { paramsTuple?: []; params?: {} }
    'admin.dealers.create': { paramsTuple?: []; params?: {} }
    'admin.towns.index': { paramsTuple?: []; params?: {} }
    'admin.towns.create': { paramsTuple?: []; params?: {} }
    'admin.devices.index': { paramsTuple?: []; params?: {} }
    'admin.devices.create': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.index': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.create': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.export': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.export_dealer': { paramsTuple: [ParamValue]; params: {'dealerId': ParamValue} }
    'admin.audit_logs.index': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'admin.users.create': { paramsTuple?: []; params?: {} }
    'admin.users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.show_signup': { paramsTuple?: []; params?: {} }
    'lookups.towns': { paramsTuple?: []; params?: {} }
    'lookups.devices': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.index': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.create': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dealer.dashboard': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.export': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.dealers.index': { paramsTuple?: []; params?: {} }
    'admin.dealers.create': { paramsTuple?: []; params?: {} }
    'admin.towns.index': { paramsTuple?: []; params?: {} }
    'admin.towns.create': { paramsTuple?: []; params?: {} }
    'admin.devices.index': { paramsTuple?: []; params?: {} }
    'admin.devices.create': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.index': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.create': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.export': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.export_dealer': { paramsTuple: [ParamValue]; params: {'dealerId': ParamValue} }
    'admin.audit_logs.index': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'admin.users.create': { paramsTuple?: []; params?: {} }
    'admin.users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.signup': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dealer.sales_entries.store': { paramsTuple?: []; params?: {} }
    'dealer.sales_entries.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.dealers.store': { paramsTuple?: []; params?: {} }
    'admin.dealers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.towns.store': { paramsTuple?: []; params?: {} }
    'admin.towns.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.devices.store': { paramsTuple?: []; params?: {} }
    'admin.devices.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.sales_entries.store': { paramsTuple?: []; params?: {} }
    'admin.sales_entries.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.store': { paramsTuple?: []; params?: {} }
    'admin.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}