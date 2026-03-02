import { motion } from 'framer-motion'
import { useAppDispatch } from '@/app/redux/store'
import { Menu } from 'lucide-react'
import { setOpenAdminSidebar } from '@/app/redux/features/dashboardSlice'

const MobileMenuButton = () => {
  const dispatch = useAppDispatch()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(setOpenAdminSidebar())}
      className="block lg:hidden relative p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-all"
    >
      <Menu className="w-5 h-5 text-neutral-400" />
    </motion.button>
  )
}

export default MobileMenuButton
