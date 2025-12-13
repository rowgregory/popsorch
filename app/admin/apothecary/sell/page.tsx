'use client'

import { useState } from 'react'
import {
  MapPin,
  BarChart3,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  CreditCard,
  ShoppingCart,
  Ticket,
  Users2,
  Target,
  Percent,
  Edit,
  Copy,
  ExternalLink
} from 'lucide-react'

const events = [
  {
    id: 'hocus-pocus',
    title: 'Hocus Pocus Pops at Riverview',
    date: 'October 30, 2024',
    time: '7:30 PM',
    venue: 'Riverview Theater',
    capacity: 500,
    sold: 322,
    revenue: '$15,430.00',
    status: 'On Sale'
  },
  {
    id: 'christmas-symphony',
    title: 'Christmas Symphony Spectacular',
    date: 'December 15, 2024',
    time: '8:00 PM',
    venue: 'Main Concert Hall',
    capacity: 800,
    sold: 156,
    revenue: '$12,450.00',
    status: 'Early Bird'
  },
  {
    id: 'new-years-gala',
    title: "New Year's Eve Gala",
    date: 'December 31, 2024',
    time: '9:00 PM',
    venue: 'Grand Ballroom',
    capacity: 300,
    sold: 89,
    revenue: '$8,900.00',
    status: 'Premium'
  }
]

const ticketTypes = [
  {
    id: 1,
    name: 'Orchestra',
    section: 'A-K',
    price: '$65.00',
    available: 120,
    total: 240,
    revenue: '$7,800.00',
    conversionRate: '85%'
  },
  {
    id: 2,
    name: 'Mezzanine',
    section: 'L-R',
    price: '$45.00',
    available: 95,
    total: 160,
    revenue: '$2,925.00',
    conversionRate: '78%'
  },
  {
    id: 3,
    name: 'Balcony',
    section: 'S-Z',
    price: '$35.00',
    available: 67,
    total: 120,
    revenue: '$1,855.00',
    conversionRate: '92%'
  },
  {
    id: 4,
    name: 'Box Seats',
    section: 'VIP',
    price: '$95.00',
    available: 15,
    total: 40,
    revenue: '$2,375.00',
    conversionRate: '95%'
  }
]

const salesMetrics = [
  { label: 'Total Sales', value: '$15,430', change: '+12.3%', icon: DollarSign },
  { label: 'Tickets Sold', value: '322', change: '+8.7%', icon: Ticket },
  { label: 'Conversion Rate', value: '87.5%', change: '+2.1%', icon: Target },
  { label: 'Avg. Order Value', value: '$67.50', change: '+5.4%', icon: TrendingUp }
]

const recentTransactions = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    tickets: 2,
    section: 'Orchestra A-15, A-16',
    amount: '$130.00',
    time: '2 min ago',
    method: 'Credit Card'
  },
  {
    id: 2,
    customer: 'Michael Chen',
    tickets: 4,
    section: 'Mezzanine L-8 to L-11',
    amount: '$180.00',
    time: '7 min ago',
    method: 'PayPal'
  },
  {
    id: 3,
    customer: 'Emily Rodriguez',
    tickets: 1,
    section: 'Box Seat VIP-3',
    amount: '$95.00',
    time: '12 min ago',
    method: 'Credit Card'
  },
  {
    id: 4,
    customer: 'David Thompson',
    tickets: 6,
    section: 'Balcony S-15 to S-20',
    amount: '$210.00',
    time: '18 min ago',
    method: 'Bank Transfer'
  }
]

const PrimaVistaSellDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState('hocus-pocus')

  const currentEvent = events.find((e) => e.id === selectedEvent)
  const soldPercentage = currentEvent ? Math.round((currentEvent.sold / currentEvent.capacity) * 100) : 0

  return (
    <div className="pt-12 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Ticket Sales Dashboard</h2>
            <p className="text-neutral-400">Manage sales, track performance, and optimize revenue</p>
          </div>

          <div className="mt-3 xl:mt-0 flex items-center space-x-3">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-4 py-2 bg-neutral-800/50 border border-neutral-600/50 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
            <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 rounded-lg text-white font-medium transition-all shadow-lg shadow-purple-500/25 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Event</span>
            </button>
          </div>
        </div>

        {/* Event Overview */}
        {currentEvent && (
          <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentEvent.title}</h3>
                <div className="flex items-center space-x-6 text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{currentEvent.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{currentEvent.venue}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white mb-1">{soldPercentage}%</div>
                <div className="text-neutral-400 text-sm">Capacity Sold</div>
                <div className="w-24 h-2 bg-neutral-700 rounded-full mt-2">
                  <div
                    className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                    style={{ width: `${soldPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sales Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {salesMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-neutral-600/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
                  <metric.icon className="w-6 h-6 text-violet-400" />
                </div>
                <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
              <div>
                <h3 className="text-neutral-400 text-sm font-medium mb-2">{metric.label}</h3>
                <span className="text-2xl font-bold text-white">{metric.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Types */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
              <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Ticket className="w-5 h-5 text-violet-400" />
                    <span>Ticket Types & Pricing</span>
                  </h3>
                  <button className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg text-violet-400 transition-colors flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit Pricing</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-neutral-800/30 rounded-xl p-4 border border-neutral-700/30 hover:border-neutral-600/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
                            <Users2 className="w-6 h-6 text-violet-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{ticket.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-neutral-400">
                              <span>Section {ticket.section}</span>
                              <span>•</span>
                              <span className="text-emerald-400">{ticket.conversionRate} conversion</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-white">{ticket.price}</div>
                          <div className="text-sm text-neutral-400">
                            {ticket.available} / {ticket.total} available
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-neutral-400">Sales Progress</span>
                            <span className="text-white font-medium">{ticket.revenue}</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-700 rounded-full">
                            <div
                              className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                              style={{ width: `${((ticket.total - ticket.available) / ticket.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg text-neutral-400 hover:text-white transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg text-neutral-400 hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
              <div className="bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-violet-400" />
                  <span>Recent Sales</span>
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center space-x-3 p-3 bg-neutral-800/20 rounded-lg hover:bg-neutral-700/20 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                        <ShoppingCart className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium">{transaction.customer}</div>
                        <div className="text-neutral-400 text-sm truncate">{transaction.section}</div>
                        <div className="text-neutral-500 text-xs">{transaction.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{transaction.amount}</div>
                        <div className="text-emerald-400 text-sm">{transaction.tickets} tickets</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg text-white font-medium transition-all flex items-center justify-center space-x-2">
                  <Percent className="w-4 h-4" />
                  <span>Apply Discount</span>
                </button>
                <button className="w-full px-4 py-3 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg text-white font-medium transition-all flex items-center justify-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrimaVistaSellDashboard
