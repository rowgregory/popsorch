'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle, User, Key, Eye, EyeOff, Copy, Check } from 'lucide-react'

export default function ResendCard({ credentials }: { credentials: any }) {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)

  const handleCopy = async (text: string, type: 'email' | 'password') => {
    await navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Resend</h3>
              <p className="text-sm text-neutral-400">Transactional Email Service</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400" />
            Connected
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="group">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              Email
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700">
                <code className="text-sm text-neutral-200 font-mono">{credentials?.email}</code>
              </div>
              <button
                onClick={() => handleCopy(credentials?.email, 'email')}
                className="flex-none px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-neutral-400" />
                )}
              </button>
            </div>
          </div>

          <div className="group">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Key className="w-3 h-3" />
              Password
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700">
                <code className="block text-neutral-200 font-mono text-xs sm:text-sm break-all">
                  {showPassword ? credentials?.password : '••••••••••••••••••'}
                </code>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex-1 sm:flex-none px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-neutral-400 mx-auto" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-400 mx-auto" />
                  )}
                </button>
                <button
                  onClick={() => handleCopy(credentials?.password, 'password')}
                  className="flex-1 sm:flex-none px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
                >
                  {copiedPassword ? (
                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400 mx-auto" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {['Contact form notifications', 'Camp application notifications'].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-xs text-neutral-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="https://resend.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-all border border-neutral-700"
      >
        Open Resend
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  )
}
