'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UserCircle, Loader2, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { User, UserRole } from '@prisma/client'
import { updateUserRole } from '@/app/lib/actions/user/updateUserRole'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'

interface Props {
  user: User
  onClose: () => void
}

const ROLES: { value: UserRole; label: string; description: string }[] = [
  {
    value: 'PATRON',
    label: 'Patron',
    description: 'Read-only access to patron features'
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    description: 'Full access to the admin dashboard'
  }
]

export default function UserRoleModal({ user, onClose }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<UserRole>(user?.role ?? 'PATRON')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!user) return
    if (selected === user.role) {
      onClose()
      return
    }

    setLoading(true)
    const res = await updateUserRole(user.id, selected)
    setLoading(false)

    if (res.success) {
      store.dispatch(showToast({ type: 'success', message: `${user.firstName} updated to ${selected}` }))
      router.refresh()
      onClose()
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to update role' }))
    }
  }

  return (
    <AnimatePresence>
      {user && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%', transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-surface-dark border-t sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm sm:border border-border-dark"
            role="dialog"
            aria-modal="true"
            aria-label="Update user role"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-border-dark" aria-hidden="true" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-4 py-3 border-b border-border-dark">
              <div className="flex items-center gap-2 min-w-0">
                <UserCircle className="w-4 h-4 text-primary-dark shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <h2 className="font-quicksand font-black text-text-dark text-base leading-none truncate">
                    {user.firstName}
                  </h2>
                  <p className="text-[10px] font-mono text-muted-dark mt-0.5 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-dark hover:text-text-dark transition-colors ml-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role options */}
            <div className="px-4 py-4 space-y-2">
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-3">Select Role</p>
              {ROLES.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelected(role.value)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 border transition-colors text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark ${
                    selected === role.value
                      ? 'border-primary-dark bg-primary-dark/10'
                      : 'border-border-dark hover:border-muted-dark hover:bg-button-dark'
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-medium ${selected === role.value ? 'text-text-dark' : 'text-muted-dark'}`}
                    >
                      {role.label}
                    </p>
                    <p className="text-[9px] font-mono text-muted-dark/60 mt-0.5">{role.description}</p>
                  </div>
                  {selected === role.value && (
                    <Check className="w-3.5 h-3.5 text-primary-dark shrink-0" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-4 py-3 border-t border-border-dark">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-2.5 bg-primary-dark hover:bg-secondary-light text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {loading ? 'Saving...' : 'Update Role'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
