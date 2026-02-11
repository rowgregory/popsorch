import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { resetAuth } from '@/app/redux/features/authSlice'
import { useSendPushNotificationMutation } from '@/app/redux/services/pushNotificationApi'
import { resetUser } from '@/app/redux/features/userSlice'
import { showToast } from '@/app/redux/features/toastSlice'
import { signOut } from 'next-auth/react'
import { store } from '@/app/redux/store'
import { useState } from 'react'

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [sendPushNotification] = useSendPushNotificationMutation()

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await signOut({ callbackUrl: '/auth/login' })
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
        store.dispatch(showToast({ type: 'error', description: 'Push Notification Failed', message: error }))
      }
      store.dispatch(resetAuth())
      store.dispatch(resetUser())
    } catch (error: any) {
      store.dispatch(showToast({ type: 'error', description: 'Logout Failed', message: error }))
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="relative px-3.5 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-all h-7"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-t-0 border-blaze-400 animate-spin rounded-full" />
        ) : (
          <LogOut className="w-4 h-4 text-neutral-400" />
        )}
      </motion.button>
    </>
  )
}

export default LogoutButton
