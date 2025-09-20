import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { resetAuth } from '@/app/redux/features/authSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useLogoutMutation } from '@/app/redux/services/authApi'
import { useSendPushNotificationMutation } from '@/app/redux/services/pushNotificationApi'
import { resetUser } from '@/app/redux/features/userSlice'
import { showToast } from '@/app/redux/features/toastSlice'

const LogoutButton = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.user)

  const [logout, { isLoading }] = useLogoutMutation() as any
  const [sendPushNotification] = useSendPushNotificationMutation()

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(resetAuth())

    try {
      logout({ id: user.id }).unwrap()
      push('/auth/login')
      const storedSubscription = localStorage.getItem('pushSubscription')
      const subscription = storedSubscription ? JSON.parse(storedSubscription) : null

      try {
        if (subscription && subscription.endpoint) {
          await sendPushNotification({
            endpoint: subscription.endpoint,
            keys: subscription.keys,
            message: 'Logout successful'
          }).unwrap()
        }
      } catch (error: any) {
        dispatch(showToast({ type: 'error', description: 'Push Notification Failed', message: error }))
      }
      dispatch(resetUser())
    } catch (error: any) {
      dispatch(showToast({ type: 'error', description: 'Logout Failed', message: error }))
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="relative p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-all"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-t-0 border-blaze-400 animate-spin rounded-full" />
        ) : (
          <LogOut className="w-5 h-5 text-neutral-400" />
        )}
      </motion.button>
    </>
  )
}

export default LogoutButton
