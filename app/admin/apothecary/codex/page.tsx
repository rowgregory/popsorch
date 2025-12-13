'use client'

import { Eye, Calendar, TrendingUp, Filter, Download, MoreHorizontal } from 'lucide-react'

const seriesData = [
  {
    id: 1,
    title: 'Hocus Pocus Pops at Riverview on Thursday',
    type: 'Reserved: Per Seat',
    priceRange: '$35.00 - $65.00',
    grossSales: '$0.00',
    conversionFees: '$0.00',
    date: 'Oct 30',
    nextEvent: 'Thu October 30 7:30 PM',
    ticketsSold: '322 tickets sold',
    status: 'On Sale',
    venue: 'Riverview Theater'
  },
  {
    id: 2,
    title: 'Christmas Symphony Spectacular',
    type: 'Reserved: Per Seat',
    priceRange: '$45.00 - $125.00',
    grossSales: '$12,450.00',
    conversionFees: '$124.50',
    date: 'Dec 15',
    nextEvent: 'Fri December 15 8:00 PM',
    ticketsSold: '156 tickets sold',
    status: 'Selling Fast',
    venue: 'Main Concert Hall'
  },
  {
    id: 3,
    title: "New Year's Eve Gala",
    type: 'Reserved: Per Seat',
    priceRange: '$75.00 - $200.00',
    grossSales: '$8,900.00',
    conversionFees: '$89.00',
    date: 'Dec 31',
    nextEvent: 'Sun December 31 9:00 PM',
    ticketsSold: '89 tickets sold',
    status: 'Premium Event',
    venue: 'Grand Ballroom'
  }
]

const stats = [
  { label: 'Total Revenue', value: '$21,350.00', change: '+12.5%', trend: 'up' },
  { label: 'Tickets Sold', value: '567', change: '+8.2%', trend: 'up' },
  { label: 'Conversion Rate', value: '94.3%', change: '+2.1%', trend: 'up' },
  { label: 'Avg. Ticket Price', value: '$67.50', change: '+5.4%', trend: 'up' }
]

const Hub = () => {
  return (
    <div className="pt-12">
      <div className="px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">The Codex</h2>
            <p className="text-neutral-400">Manage your events with advanced analytics and premium features</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-x-3 lg:space-y-0 mt-3 lg:mt-0">
            <button className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg text-neutral-300 border border-neutral-600/50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg text-neutral-300 border border-neutral-600/50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 rounded-lg text-white font-medium transition-all shadow-lg shadow-purple-500/25">
              Expand Snapshot
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-neutral-600/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 text-sm font-medium">{stat.label}</h3>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden">
          {/* Table Header */}
          <div className="hidden lg:block bg-gradient-to-r from-neutral-800/80 to-neutral-700/80 px-6 py-4 border-b border-neutral-600/30">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-violet-400" />
                <span>Series with Upcoming Events</span>
              </h3>
              <div className="flex items-center space-x-2 text-sm text-neutral-400">
                <span>21 items found, displaying all items</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Table Header */}
          <div className="hidden lg:block bg-gradient-to-r from-neutral-700/50 to-neutral-800/50 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-neutral-300">
              <div className="col-span-3">Series</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-2 text-center">Standard Prices</div>
              <div className="col-span-2 text-center">Today&apos;s Gross Sales</div>
              <div className="col-span-1 text-center">Dates</div>
              <div className="col-span-2 text-center">Next Event</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
          </div>

          {/* Enhanced Table Rows */}
          <div className="divide-y divide-neutral-700/30">
            {seriesData.map((series) => (
              <div key={series.id} className="px-6 py-6 hover:bg-neutral-800/20 transition-colors group">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Series Info */}
                  <div className="col-span-12 lg:col-span-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
                        <Eye className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium hover:text-violet-400 cursor-pointer transition-colors">
                          {series.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-neutral-400 text-sm">{series.venue}</span>
                          <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              series.status === 'On Sale'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : series.status === 'Selling Fast'
                                ? 'bg-orange-500/20 text-orange-400'
                                : 'bg-purple-500/20 text-purple-400'
                            }`}
                          >
                            {series.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-12 lg:col-span-1">
                    <span className="text-neutral-300 text-sm">{series.type}</span>
                  </div>

                  {/* Prices */}
                  <div className="col-span-12 lg:col-span-2 text-center">
                    <div className="text-white font-medium">{series.priceRange}</div>
                  </div>

                  {/* Sales */}
                  <div className="col-span-12 lg:col-span-2 text-center">
                    <div className="text-white font-medium">{series.grossSales}</div>
                    <div className="text-neutral-400 text-sm">Conv Fees: {series.conversionFees}</div>
                  </div>

                  {/* Date */}
                  <div className="col-span-12 lg:col-span-1 text-center">
                    <div className="text-white font-medium">{series.date}</div>
                  </div>

                  {/* Next Event */}
                  <div className="col-span-12 lg:col-span-2 text-center">
                    <div className="text-violet-400 font-medium">{series.nextEvent}</div>
                    <div className="text-emerald-400 text-sm">({series.ticketsSold})</div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-12 lg:col-span-1 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg text-violet-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-lg text-neutral-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hub
