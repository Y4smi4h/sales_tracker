import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Dealer from '#models/dealer'
import SalesEntry from '#models/sales_entry'

export default class DashboardController {
  async index({ view }: HttpContext) {
    const dealers = await Dealer.query()
    const totalPG = dealers.length

    const entries = await SalesEntry.query().preload('lines', (q) => q.preload('device'))

    const now = DateTime.now()
    const startOfDay = now.startOf('day')
    const startOfWeek = now.startOf('week')
    const startOfMonth = now.startOf('month')

    let totalUnits = 0
    let todayUnits = 0
    let weekUnits = 0
    let monthUnits = 0
    const dealerIdsWithSales = new Set<number>()
    const modelTotals: Record<string, number> = {}
    const dailyTotals: Record<string, number> = {}

    for (const entry of entries) {
      dealerIdsWithSales.add(entry.dealerId)
      const entryDate = entry.createdAt
      const dayKey = entryDate.toFormat('dd/MM')

      for (const line of entry.lines) {
        totalUnits += line.quantity
        if (entryDate >= startOfDay) todayUnits += line.quantity
        if (entryDate >= startOfWeek) weekUnits += line.quantity
        if (entryDate >= startOfMonth) monthUnits += line.quantity

        const modelKey = `${line.device.marketingName} (${line.device.memory})`
        modelTotals[modelKey] = (modelTotals[modelKey] || 0) + line.quantity
        dailyTotals[dayKey] = (dailyTotals[dayKey] || 0) + line.quantity
      }
    }

    const topModels = Object.entries(modelTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([model, qty]) => ({ model, qty }))

    const chartDays = []
    for (let i = 13; i >= 0; i--) {
      const d = now.minus({ days: i })
      const key = d.toFormat('dd/MM')
      chartDays.push({ label: key, value: dailyTotals[key] || 0 })
    }
    const maxChartValue = Math.max(1, ...chartDays.map((d) => d.value))

    return view.render('admin/dashboard', {
      totalPG,
      activePG: dealerIdsWithSales.size,
      totalTransactions: entries.length,
      totalUnits,
      todayUnits,
      weekUnits,
      monthUnits,
      topModels,
      chartDays,
      maxChartValue,
    })
  }
}