import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { resetAuth } from '@/app/redux/features/authSlice'
import { resetUser } from '@/app/redux/features/userSlice'
import { showToast } from '@/app/redux/features/toastSlice'
import { signOut } from 'next-auth/react'
import { store } from '@/app/redux/store'
import { useState } from 'react'

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await signOut({ callbackUrl: '/auth/login' })
      store.dispatch(resetAuth())
      store.dispatch(resetUser())
    } catch (error: any) {
      store.dispatch(showToast({ type: 'error', description: 'Logout Failed', message: error }))
    }
  }

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="relative flex items-center justify-center px-3.5 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-all h-7"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-t-0 border-blaze-400 animate-spin rounded-full" />
        ) : (
          <LogOut className="w-4 h-4 text-neutral-400" />
        )}
      </motion.button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        Logout
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-700" />
      </div>
    </div>
  )
}

export default LogoutButton
