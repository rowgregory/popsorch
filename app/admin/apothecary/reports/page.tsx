'use client'

import React, { useState } from 'react'
import {
  DollarSign,
  Users,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  MapPin,
  Star,
  Ticket,
  CreditCard,
  LineChart
} from 'lucide-react'

const salesData = [
  { month: 'Jan', revenue: 45000, tickets: 520, events: 8 },
  { month: 'Feb', revenue: 52000, tickets: 620, events: 9 },
  { month: 'Mar', revenue: 48000, tickets: 580, events: 7 },
  { month: 'Apr', revenue: 61000, tickets: 720, events: 11 },
  { month: 'May', revenue: 58000, tickets: 680, events: 10 },
  { month: 'Jun', revenue: 67000, tickets: 780, events: 12 }
]

const topEvents = [
  { name: 'Summer Symphony Spectacular', revenue: '$12,450', tickets: 285, conversion: '94%', status: 'sold-out' },
  { name: 'Holiday Jazz Collection', revenue: '$9,800', tickets: 220, conversion: '87%', status: 'selling' },
  { name: 'Classical Masterworks', revenue: '$8,650', tickets: 195, conversion: '82%', status: 'selling' },
  { name: 'Broadway Hits Showcase', revenue: '$7,900', tickets: 175, conversion: '91%', status: 'sold-out' },
  { name: 'Chamber Music Series', revenue: '$6,200', tickets: 140, conversion: '78%', status: 'selling' }
]

const venuePerformance = [
  { name: 'Main Concert Hall', capacity: 800, utilization: '92%', revenue: '$35,200', events: 15 },
  { name: 'Riverview Theater', capacity: 500, utilization: '88%', revenue: '$22,800', events: 12 },
  { name: 'Grand Ballroom', capacity: 300, utilization: '85%', revenue: '$18,400', events: 10 },
  { name: 'Intimate Studio', capacity: 150, utilization: '95%', revenue: '$12,600', events: 8 }
]

const keyMetrics = [
  {
    label: 'Total Revenue',
    value: '$67,000',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    period: 'vs last month'
  },
  {
    label: 'Tickets Sold',
    value: '780',
    change: '+8.7%',
    trend: 'up',
    icon: Ticket,
    period: 'this month'
  },
  {
    label: 'Conversion Rate',
    value: '87.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Target,
    period: 'average'
  },
  {
    label: 'Avg. Ticket Price',
    value: '$85.90',
    change: '+5.4%',
    trend: 'up',
    icon: CreditCard,
    period: 'current'
  }
]

const customerInsights = [
  { segment: 'Season Subscribers', percentage: 45, revenue: '$30,150', growth: '+15%' },
  { segment: 'Single Event', percentage: 35, revenue: '$23,450', growth: '+8%' },
  { segment: 'Group Sales', percentage: 20, revenue: '$13,400', growth: '+22%' }
]

const PrimaVistaReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days')

  return (
    <div className="pt-12 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Performance Reports</h2>
            <p className="text-neutral-400">Advanced analytics and insights for your venues</p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-white focus:ring-2 focus:ring-violet-500"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="last-year">Last Year</option>
            </select>

            <button className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg text-neutral-300 border border-neutral-600/50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-neutral-600/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-violet-500/30">
                    <metric.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span className="font-medium">{metric.change}</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-neutral-400 text-sm">{metric.label}</div>
                  <div className="text-neutral-500 text-xs mt-1">{metric.period}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Chart & Top Events */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Trend Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <LineChart className="w-5 h-5 text-violet-400" />
                  <span>Revenue Trend</span>
                </h3>
                <div className="flex items-center space-x-2 text-sm text-neutral-400">
                  <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                  <span>Monthly Revenue</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="h-full flex items-end justify-between space-x-2">
                {salesData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-neutral-700 rounded-t-lg relative group cursor-pointer">
                      <div
                        className="bg-gradient-to-t from-violet-500 to-purple-500 rounded-t-lg transition-all duration-300 group-hover:from-violet-400 group-hover:to-purple-400"
                        style={{ height: `${(data.revenue / 30000) * 200}px` }}
                      ></div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                        <div className="font-semibold">${data.revenue.toLocaleString()}</div>
                        <div className="text-neutral-400">{data.tickets} tickets</div>
                      </div>
                    </div>
                    <div className="text-neutral-400 text-sm mt-2">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Events */}
          <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Star className="w-5 h-5 text-violet-400" />
                <span>Top Events</span>
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-neutral-800/30 rounded-lg p-4 hover:bg-neutral-700/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm leading-tight">{event.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          event.status === 'sold-out'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {event.status === 'sold-out' ? 'Sold Out' : 'On Sale'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-neutral-400">Revenue</div>
                        <div className="text-white font-semibold">{event.revenue}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Tickets</div>
                        <div className="text-white font-semibold">{event.tickets}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400">Conv.</div>
                        <div className="text-emerald-400 font-semibold">{event.conversion}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Venue Performance & Customer Segments */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Venue Performance */}
          <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-violet-400" />
                <span>Venue Performance</span>
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {venuePerformance.map((venue, index) => (
                  <div key={index} className="bg-neutral-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{venue.name}</h4>
                      <span className="text-emerald-400 font-semibold">{venue.utilization}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-neutral-400 text-xs">Capacity</div>
                        <div className="text-white font-semibold">{venue.capacity}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400 text-xs">Revenue</div>
                        <div className="text-white font-semibold">{venue.revenue}</div>
                      </div>
                      <div>
                        <div className="text-neutral-400 text-xs">Events</div>
                        <div className="text-white font-semibold">{venue.events}</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: venue.utilization }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
            <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-violet-400" />
                <span>Customer Segments</span>
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {customerInsights.map((segment, index) => (
                  <div key={index} className="bg-neutral-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{segment.segment}</h4>
                      <span className="text-emerald-400 text-sm font-semibold">{segment.growth}</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-400 text-sm">Revenue Contribution</span>
                      <span className="text-white font-semibold">{segment.revenue}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-neutral-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-neutral-300 text-sm font-medium">{segment.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PrimaVistaReports
