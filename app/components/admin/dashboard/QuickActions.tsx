import { Calendar, FileText, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { setOpenTeamMemberDrawer } from '@/app/redux/features/teamMemberSlice'
import { useAppDispatch } from '@/app/redux/store'
import { useRouter } from 'next/navigation'

const QuickActions = () => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const actions = [
    {
      id: 1,
      label: 'Add Musician',
      icon: UserPlus,
      onClick: () => {
        dispatch(setOpenTeamMemberDrawer())
      }
    },
    {
      id: 2,
      label: 'Manage Concerts',
      icon: Calendar,
      onClick: () => push('/admin/concerts')
    },
    {
      id: 3,
      label: 'View Questions',
      icon: FileText,
      onClick: () => push('/admin/questions')
    }
  ]

  return (
    <motion.div
      className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700/70 transition-all duration-300 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="space-y-1 mb-6">
        <h3 className="text-2xl font-bold text-white">Quick Actions</h3>
        <span className="text-sm text-neutral-400">Common tasks</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="flex items-center justify-center space-x-3 px-6 py-4 bg-neutral-800/30 hover:bg-neutral-800/50 border border-neutral-700/50 hover:border-neutral-600 rounded-lg transition-all duration-200 group"
            >
              <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              <span className="text-neutral-300 group-hover:text-white font-medium transition-colors">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default QuickActions
