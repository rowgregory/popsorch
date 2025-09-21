'use client'

import React from 'react'
import {
  Eye,
  Crown,
  Zap,
  BarChart3,
  Shield,
  Clock,
  Users,
  Target,
  Award,
  ArrowRight,
  Building2,
  CheckCircle2
} from 'lucide-react'
import { useSubmitQuoteMutation } from '@/app/redux/services/quoteApi'
import { showToast } from '@/app/redux/features/toastSlice'
import { useAppDispatch } from '@/app/redux/store'
import { setCurrentDialogue, setOpenConductorModal } from '@/app/redux/features/dashboardSlice'
import useSoundEffect from '@/app/hooks/useSoundEffect'

const benefits = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics Dashboard',
    description:
      'Deep insights into sales performance, conversion rates, and revenue optimization with real-time reporting.'
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Performance',
    description:
      'Sub-second load times and instant updates. Built on modern infrastructure for enterprise-scale reliability.'
  },
  {
    icon: Target,
    title: 'Dynamic Pricing Engine',
    description:
      'Sophisticated pricing controls with automated adjustments based on demand, inventory, and market conditions.'
  },
  {
    icon: Users,
    title: 'Multi-Venue Management',
    description: 'Centralized control for unlimited venues and events with role-based permissions and access controls.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security & Uptime',
    description: '99.9% uptime SLA with bank-level security, automated backups, and disaster recovery protocols.'
  },
  {
    icon: Clock,
    title: 'Real-Time Operations',
    description:
      'Live inventory updates, instant seat availability, and real-time sales monitoring across all channels.'
  },
  {
    icon: Award,
    title: 'White-Label Customization',
    description:
      'Fully branded experience with custom themes, logos, and domain integration for seamless brand consistency.'
  },
  {
    icon: Eye,
    title: 'Modern Interface Design',
    description:
      'Intuitive, responsive interface designed for efficiency. Your team will love the streamlined workflow.'
  }
]

const comparisonFeatures = [
  { feature: 'Setup Time', audienceView: '6-12 months', primaVista: 'Immediate start', advantage: true },
  { feature: 'Custom Features', audienceView: 'Limited/Expensive', primaVista: 'Included & Fast', advantage: true },
  {
    feature: 'Support Response',
    audienceView: 'Ticket System',
    primaVista: 'Direct Developer Access',
    advantage: true
  },
  { feature: 'Updates', audienceView: 'Quarterly/Slow', primaVista: 'Instant Deployment', advantage: true },
  { feature: 'Annual Cost', audienceView: '$42,000', primaVista: '$30,000', advantage: true },
  { feature: 'Performance', audienceView: 'Legacy Infrastructure', primaVista: 'Modern & Fast', advantage: true }
]

const testimonialStats = [
  { value: '10x', label: 'Faster', sublabel: 'Performance vs competitors' },
  { value: '$12K', label: 'Saved', sublabel: 'Annually vs AudienceView' },
  { value: '99.9%', label: 'Uptime', sublabel: 'Enterprise SLA' },
  { value: '< 1s', label: 'Load Time', sublabel: 'Lightning fast' }
]

const PrimaVistaPricingSection = () => {
  const [submitQuote, { isLoading }] = useSubmitQuoteMutation()
  const dispatch = useAppDispatch()
  const { play } = useSoundEffect('/mp3/level-win.mp3', true)

  const handlePurchaseClick = async () => {
    try {
      await submitQuote({
        name: 'Conductor Name',
        companyName: 'The Pops Orchestra',
        email: 'conductor@email.com',
        phone: '555-123-4567',
        message: 'Apothecary Professional Purchase Request - $25K setup + $2.5K monthly'
      }).unwrap()
      dispatch(setOpenConductorModal())
      dispatch(setCurrentDialogue(3))
      play()
      dispatch(
        showToast({
          type: 'success',
          message: 'Message Sent',
          description: `You've successfully sent Sqysh a message regarding your interest in the Apothecary platform`
        })
      )
    } catch {
      dispatch(
        showToast({
          type: 'error',
          message: 'Message submission failed',
          description: `Oops! Something went wrong. Please try again.`
        })
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800/50">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-full px-6 py-3 mb-8">
              <Crown className="w-5 h-5 text-violet-400" />
              <span className="text-violet-300 font-semibold text-sm tracking-wide uppercase">Enterprise Solution</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block text-white">Upgrade from</span>
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AudienceView
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Replace your outdated ticket management system with modern technology that performs 10x faster while
              saving $12,000 annually.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {testimonialStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-violet-300 font-semibold text-lg">{stat.label}</div>
                  <div className="text-neutral-400 text-sm">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-24 lg:py-32 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Investment Comparison</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              See the real cost difference between outdated and modern solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
            <div className="relative">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-red-500/20 rounded-2xl p-8 lg:p-10">
                <div className="absolute -top-4 left-8">
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2">
                    <span className="text-red-300 font-semibold text-sm">CURRENT SYSTEM</span>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">AudienceView</h3>

                  <div className="mb-8">
                    <div className="text-5xl lg:text-6xl font-bold text-red-300 mb-2">$42,000</div>
                    <div className="text-red-400 text-lg">per year</div>
                    <div className="text-neutral-400 text-sm">($3,500/month)</div>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-red-300/80 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span>Slow updates (quarterly releases)</span>
                    </div>
                    <div className="flex items-center text-red-300/80 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span>Limited customization options</span>
                    </div>
                    <div className="flex items-center text-red-300/80 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span>Corporate support ticket system</span>
                    </div>
                    <div className="flex items-center text-red-300/80 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span>Legacy infrastructure & interfaces</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Apothecary */}
            <div className="relative">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-emerald-500/30 rounded-2xl p-8 lg:p-10">
                <div className="absolute -top-4 left-8">
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-2">
                    <span className="text-emerald-300 font-semibold text-sm">RECOMMENDED</span>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">Apothecary Professional</h3>

                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-emerald-300">$25,000</div>
                      <div className="text-emerald-400/80 text-sm">One-time development</div>
                    </div>
                    <div>
                      <div className="text-4xl lg:text-5xl font-bold text-emerald-300">$2,500</div>
                      <div className="text-emerald-400 text-lg">per month</div>
                      <div className="text-neutral-400 text-sm">($30,000/year total)</div>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                    <div className="text-emerald-300 font-bold text-lg">Save $12,000 Annually</div>
                    <div className="text-emerald-400/80 text-sm">Plus superior technology & support</div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                    <div className="text-blue-300 font-semibold text-sm flex items-center justify-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Development begins immediately upon purchase
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-emerald-300/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                      <span>Instant updates & feature deployment</span>
                    </div>
                    <div className="flex items-center text-emerald-300/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                      <span>Unlimited customization included</span>
                    </div>
                    <div className="flex items-center text-emerald-300/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                      <span>Direct developer access & support</span>
                    </div>
                    <div className="flex items-center text-emerald-300/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                      <span>Modern architecture & interface</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 lg:py-32 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Feature Comparison</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              See why Apothecary outperforms AudienceView in every category
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 border border-neutral-700/50 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-neutral-800/50 border-b border-neutral-700/50">
                <div className="px-6 py-4">
                  <h3 className="font-semibold text-neutral-300">Feature</h3>
                </div>
                <div className="px-6 py-4 border-l border-neutral-700/50">
                  <h3 className="font-semibold text-red-300">AudienceView</h3>
                </div>
                <div className="px-6 py-4 border-l border-neutral-700/50">
                  <h3 className="font-semibold text-emerald-300">Apothecary</h3>
                </div>
              </div>

              {comparisonFeatures.map((item, index) => (
                <div key={index} className="grid grid-cols-3 border-b border-neutral-700/30 last:border-b-0">
                  <div className="px-6 py-4">
                    <span className="text-white font-medium">{item.feature}</span>
                  </div>
                  <div className="px-6 py-4 border-l border-neutral-700/30">
                    <span className="text-red-300/80">{item.audienceView}</span>
                  </div>
                  <div className="px-6 py-4 border-l border-neutral-700/30">
                    <div className="flex items-center">
                      <span className="text-emerald-300 font-medium">{item.primaVista}</span>
                      {item.advantage && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-2" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Enterprise Features Included</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Every feature you need for professional ticket management, plus advanced capabilities that put competitors
              to shame
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-violet-500/30 mb-6 group-hover:border-violet-400/50 transition-colors">
                  <benefit.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-violet-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership & Responsibility Section */}
      <section className="py-24 lg:py-32 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Understanding This Partnership</h2>
                <p className="text-xl text-neutral-300 leading-relaxed">
                  Apothecary isn&apos;t just software - it&apos;s a strategic technology partnership
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">What This Means for Your Organization</h3>
                  <div className="space-y-3">
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">
                        Sqysh becomes deeply integrated with your daily operations
                      </span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">Your success becomes our primary responsibility</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">We handle critical infrastructure for your revenue</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">Long-term strategic technology partnership</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-amber-300 mb-4">Sqysh&apos;s Expanded Responsibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">24/7 system monitoring and maintenance</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">Revenue protection and optimization</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">Strategic technology guidance and planning</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-neutral-300">Immediate response to critical issues</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <div className="text-center">
                  <p className="text-amber-200 font-medium mb-2">This is more than a vendor relationship</p>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    When you choose Apothecary, Sqysh becomes a core part of your organization&apos;s technology
                    infrastructure. We take on significant responsibility for your ticket sales, revenue, and customer
                    experience. This partnership requires mutual commitment to long-term success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Enterprise Features Included</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Every feature you need for professional ticket management, plus advanced capabilities that put competitors
              to shame
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-violet-500/30 mb-6 group-hover:border-violet-400/50 transition-colors">
                  <benefit.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-violet-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-violet-500/20 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-2xl transform -translate-x-32 translate-y-32"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/5 to-transparent rounded-3xl"></div>

            <div className="relative z-10 text-center px-8 lg:px-16 py-16 lg:py-20">
              <h2 className="text-4xl lg:text-6xl font-bold text-violet-100 mb-8 tracking-wide">
                Ready to Conjure Your System?
              </h2>
              <p className="text-xl lg:text-2xl text-indigo-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Abandon the archaic arts of outdated technology. Conjure a mystical, swift, and potent ticket management
                elixir for less coin. The ritual begins upon your invocation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <button
                  onClick={() => {
                    handlePurchaseClick()
                  }}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-violet-100 font-bold text-xl py-5 px-12 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all duration-500 shadow-2xl shadow-violet-900/40 flex items-center space-x-3 group transform hover:scale-105 border border-violet-400/30 hover:border-violet-300/50"
                >
                  <span>Invoke Apothecary</span>
                  {isLoading ? (
                    <div className="w-6 h-6 rounded-full border-2 border-white border-t-0 animate-spin" />
                  ) : (
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>

              <p className="text-violet-300 text-sm mb-8 max-w-2xl mx-auto italic">
                This enchantment sends a mystical message to sqysh, signaling your desire to begin the alchemical
                transformation.
              </p>

              {/* Enhanced Trust Signals */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-indigo-200">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-violet-300 mb-3">Instant Ritual Activation</h3>
                  <p className="text-sm leading-relaxed">
                    The coding ritual begins immediately upon your invocation, with no delays or waiting periods in the
                    mystical development process.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-violet-300 mb-3">Free Spirit Migration</h3>
                  <p className="text-sm leading-relaxed">
                    Your existing data and workflows are carefully transported from the old realm to the new system
                    without additional arcane fees.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-violet-300 mb-3">Direct Mage Communion</h3>
                  <p className="text-sm leading-relaxed">
                    Speak directly with the developers crafting your system, ensuring your vision is perfectly
                    understood and manifested.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrimaVistaPricingSection
