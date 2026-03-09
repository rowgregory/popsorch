'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateUserRole } from '@/app/actions/updateUserRole'
import { store, useFormSelector, useUiSelector } from '@/app/redux/store'
import { setCloseUserDrawer } from '@/app/redux/features/uiSlice'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import { showToast } from '@/app/redux/features/toastSlice'
import { deleteUser } from '@/app/actions/deleteUser'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function UserDrawer() {
  const router = useRouter()
  const { userDrawer } = useUiSelector()
  const { userForm } = useFormSelector()
  const { handleInput } = createFormActions('userForm', store.dispatch)
  const inputs = userForm?.inputs
  const onClose = () => store.dispatch(setCloseUserDrawer())
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const session = useSession()

  const fullName = [inputs?.firstName, inputs?.lastName].filter(Boolean).join(' ') || 'Unknown'
  const initials = [inputs?.firstName?.[0], inputs?.lastName?.[0]].filter(Boolean).join('').toUpperCase() || '??'

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await updateUserRole(inputs?.id, inputs?.role)
      store.dispatch(setCloseUserDrawer())
      store.dispatch(resetForm('useForm'))
      store.dispatch(showToast({ type: 'success', message: 'Successfully updated user role!' }))
      router.refresh()
    } catch (err) {
      store.dispatch(showToast({ type: 'error', message: 'Failed to update user role' }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserDelete = async (e: any, userId: string) => {
    e.stopPropagation()

    try {
      setIsDeleting(true)
      await deleteUser(userId)
      router.refresh()
      store.dispatch(showToast({ type: 'success', message: 'Successfully deleted user!' }))
    } catch {
      store.dispatch(showToast({ type: 'error', message: 'Failed to delete user' }))
    } finally {
      setIsDeleting(false)
    }
  }

  const isProtected =
    inputs?.email === 'sqysh@sqysh.io' ||
    inputs?.email === 'rowgregory@gmail.com' ||
    session?.data?.user?.id === inputs?.id

  return (
    <AnimatePresence>
      {userDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`User details for ${fullName}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-bg-light dark:bg-bg-dark border-l border-border-light dark:border-border-dark flex flex-col overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-light dark:border-border-dark shrink-0">
              <div className="flex items-center gap-3">
                <span className="block w-5 h-px bg-primary-light dark:bg-primary-dark" aria-hidden="true" />
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark">
                  User Details
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark p-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="square"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
              {/* Avatar + name */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light/30 dark:border-primary-dark/30 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-quicksand font-black text-sm text-primary-light dark:text-primary-dark">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-quicksand font-black text-base text-text-light dark:text-text-dark truncate">
                    {fullName}
                  </p>
                  <p className="text-xs font-mono text-muted-light dark:text-muted-dark truncate mt-0.5">
                    {inputs?.email ?? '—'}
                  </p>
                </div>
              </motion.div>

              {/* Fields */}
              <motion.dl
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="grid grid-cols-1 gap-px bg-border-light dark:bg-border-dark border border-border-light dark:border-border-dark"
              >
                {[
                  { label: 'User ID', value: inputs?.id },
                  { label: 'First Name', value: inputs?.firstName ?? '—' },
                  { label: 'Last Name', value: inputs?.lastName ?? '—' },
                  { label: 'Email', value: inputs?.email ?? '—' }
                ].map(({ label, value }) => (
                  <div key={label} className="bg-bg-light dark:bg-bg-dark px-4 py-3">
                    <dt className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-light dark:text-muted-dark mb-0.5">
                      {label}
                    </dt>
                    <dd className="text-xs font-mono text-text-light dark:text-text-dark break-all">{value}</dd>
                  </div>
                ))}
              </motion.dl>

              {/* Role select */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <label
                  htmlFor="role-select"
                  className="block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role-select"
                    name="role"
                    value={inputs?.role ?? ''}
                    onChange={handleInput}
                    disabled={isProtected}
                    aria-describedby={isProtected ? 'role-protected' : undefined}
                    className={`w-full appearance-none px-3.5 py-3 pr-9 text-xs font-mono border-2 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-200 focus:outline-none focus-visible:border-primary-light dark:focus-visible:border-primary-dark border-border-light dark:border-border-dark ${
                      isProtected ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="SUPERUSER" disabled>
                      Super User
                    </option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPPORTER">Supporter</option>
                  </select>
                  {/* Chevron */}
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-light dark:text-muted-dark pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="square"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  {isProtected && (
                    <p
                      id="role-protected"
                      className="text-[10px] font-mono text-muted-light dark:text-muted-dark mt-1.5"
                    >
                      This account cannot be modified.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
            {/* ── Danger zone ── */}
            {!isProtected && (
              <div className="shrink-0 px-5 py-4 border-t border-red-500/20">
                <motion.button
                  onClick={(e) => handleUserDelete(e, inputs?.id)}
                  disabled={isDeleting}
                  whileHover={!isDeleting ? { scale: 1.01 } : {}}
                  whileTap={!isDeleting ? { scale: 0.98 } : {}}
                  className="w-full py-3 text-[10px] font-mono tracking-[0.2em] uppercase border border-red-500/30 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Delete user ${fullName}`}
                >
                  {isDeleting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="block w-3 h-3 border-2 border-red-500/30 border-t-red-500"
                        aria-hidden="true"
                      />
                      Deleting...
                    </span>
                  ) : (
                    'Delete User'
                  )}
                </motion.button>
              </div>
            )}
            {/* ── Footer ── */}
            <div className="shrink-0 px-5 py-4 border-t border-border-light dark:border-border-dark flex items-center gap-3">
              <motion.button
                onClick={handleSave}
                disabled={isLoading || isProtected}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                aria-disabled={isLoading}
                className={`
    flex-1 py-3 text-[10px] font-mono font-black tracking-[0.2em] uppercase transition-colors duration-200
    focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark
    ${
      isLoading || isProtected
        ? 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark cursor-not-allowed'
        : 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-white cursor-pointer'
    }
  `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="block w-3 h-3 border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </motion.button>

              <button
                onClick={onClose}
                className="px-5 py-3 text-[10px] font-mono tracking-[0.2em] uppercase border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:border-primary-light/40 dark:hover:border-primary-dark/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
              >
                Cancel
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
