import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, ExternalLink, Eye, EyeOff, Key, User } from 'lucide-react'

export default function MailChimpCard({ credentials }: { credentials: any }) {
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
      transition={{ delay: 0.2 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Mailchimp</h3>
              <p className="text-sm text-neutral-400">Email Marketing & Campaigns</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="group">
            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              Username
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg">
                <code className="text-sm text-neutral-200 font-mono">{credentials.email}</code>
              </div>
              <button
                onClick={() => handleCopy(credentials.email, 'email')}
                className="flex-1 sm:flex-none px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                ) : (
                  <Copy className="w-4 h-4 text-neutral-400 mx-auto" />
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
              <div className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg">
                <code className="block text-neutral-200 font-mono text-xs sm:text-sm break-all">
                  {showPassword ? credentials.password : '••••••••••••••••••'}
                </code>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex-1 sm:flex-none px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-neutral-400 mx-auto" />
                  ) : (
                    <Eye className="w-4 h-4 text-neutral-400 mx-auto" />
                  )}
                </button>
                <button
                  onClick={() => handleCopy(credentials.password, 'password')}
                  className="flex-1 sm:flex-none px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors"
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
      </div>

      <a
        href={credentials.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFE01B] hover:bg-[#f0d000] text-[#241C15] font-semibold rounded-lg transition-all shadow-lg shadow-[#FFE01B]/20"
      >
        Open Mailchimp
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  )
}
