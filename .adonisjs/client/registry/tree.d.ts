/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
    showSignup: typeof routes['auth.show_signup']
    signup: typeof routes['auth.signup']
  }
  lookups: {
    towns: typeof routes['lookups.towns']
    devices: typeof routes['lookups.devices']
  }
  dealer: {
    salesEntries: {
      index: typeof routes['dealer.sales_entries.index']
      create: typeof routes['dealer.sales_entries.create']
      edit: typeof routes['dealer.sales_entries.edit']
      update: typeof routes['dealer.sales_entries.update']
      store: typeof routes['dealer.sales_entries.store']
      destroy: typeof routes['dealer.sales_entries.destroy']
      export: typeof routes['dealer.sales_entries.export']
    }
    dashboard: typeof routes['dealer.dashboard']
  }
  admin: {
    dashboard: typeof routes['admin.dashboard']
    dealers: {
      index: typeof routes['admin.dealers.index']
      create: typeof routes['admin.dealers.create']
      store: typeof routes['admin.dealers.store']
      destroy: typeof routes['admin.dealers.destroy']
    }
    towns: {
      index: typeof routes['admin.towns.index']
      create: typeof routes['admin.towns.create']
      store: typeof routes['admin.towns.store']
      destroy: typeof routes['admin.towns.destroy']
    }
    devices: {
      index: typeof routes['admin.devices.index']
      create: typeof routes['admin.devices.create']
      store: typeof routes['admin.devices.store']
      destroy: typeof routes['admin.devices.destroy']
    }
    salesEntries: {
      index: typeof routes['admin.sales_entries.index']
      create: typeof routes['admin.sales_entries.create']
      store: typeof routes['admin.sales_entries.store']
      destroy: typeof routes['admin.sales_entries.destroy']
      export: typeof routes['admin.sales_entries.export']
      exportDealer: typeof routes['admin.sales_entries.export_dealer']
    }
    auditLogs: {
      index: typeof routes['admin.audit_logs.index']
    }
    users: {
      index: typeof routes['admin.users.index']
      create: typeof routes['admin.users.create']
      store: typeof routes['admin.users.store']
      edit: typeof routes['admin.users.edit']
      update: typeof routes['admin.users.update']
      destroy: typeof routes['admin.users.destroy']
    }
  }
}
