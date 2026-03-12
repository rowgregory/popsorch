'use client'

import { useTransition } from 'react'
import Switch from '@/app/components/forms/elements/Switch'
import { Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { updateUser } from '@/app/actions/updateUser'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/redux/features/toastSlice'
import { useAppDispatch } from '@/app/redux/store'

// Reusable settings card component
function SettingsCard({ icon: Icon, iconColor, title, subtitle, delay, children }) {
  const colorMap = {
    cyan: 'bg-cyan-500/20 text-cyan-400',
    indigo: 'bg-indigo-500/20 text-indigo-400',
    emerald: 'bg-emerald-500/20 text-emerald-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-linear-to-br from-neutral-900/50 to-neutral-950 border border-neutral-700/50 rounded-xl p-6 transition-all w-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[iconColor]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-neutral-400 text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

const AdminProfile = ({ data }) => {
  const [isPending, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSoundEffectsToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked

    startTransition(async () => {
      try {
        await updateUser(data.id, { isSoundEffectsOn: newValue })
        router.refresh()
        dispatch(
          showToast({
            message: `Sound effects turned ${newValue ? 'on' : 'off'}`,
            type: 'success'
          })
        )
      } catch {
        dispatch(showToast({ message: 'Failed to update preferences', type: 'error' }))
      }
    })
  }

  return (
    <div className="h-[calc(100vh-66px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-neutral-900 to-neutral-950 border-b border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile</h1>
              <p className="text-neutral-400 text-sm sm:text-base mt-1">Manage your account details and preferences</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-linear-to-br from-neutral-900/50 to-neutral-950 border border-neutral-700/50 rounded-xl p-6 transition-all"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {data?.firstName} {data?.lastName}
            </h2>
            <p className="text-neutral-400 mb-3">{data?.email}</p>

            {data?.role && (
              <div className="flex gap-2 flex-wrap">
                {data.isAdmin && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300">
                    Admin
                  </span>
                )}
                {data.isSuperUser && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300">
                    Super User
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-800/40 rounded-lg">
              <p className="text-neutral-400 text-xs uppercase font-semibold tracking-wide mb-1">Member Since</p>
              <p className="text-white font-medium">{new Date(data?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-neutral-800/40 rounded-lg">
              <p className="text-neutral-400 text-xs uppercase font-semibold tracking-wide mb-1">Last Updated</p>
              <p className="text-white font-medium">{new Date(data?.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center flex-col md:flex-row gap-y-4 md:gap-x-4">
          {/* Audio Preferences */}
          <SettingsCard
            icon={Volume2}
            iconColor="cyan"
            title="Audio Preferences"
            subtitle="Customize your sound experience"
            delay={0.2}
          >
            <div className="flex items-center justify-between p-4 bg-neutral-800/40 rounded-lg">
              <div>
                <div className="text-neutral-200 font-medium">Sound Effects</div>
                <div className="text-neutral-400 text-sm">{data?.isSoundEffectsOn ? 'Enabled' : 'Disabled'}</div>
              </div>
              <Switch
                enabled={data?.isSoundEffectsOn}
                onChange={handleSoundEffectsToggle}
                isLoading={isPending}
                name="sound-effects"
              />
            </div>
          </SettingsCard>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
