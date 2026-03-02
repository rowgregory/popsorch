import { useAppDispatch } from '@/app/redux/store'
import { FC } from 'react'
import { motion } from 'framer-motion'
import { Contact, Image as LucideImage, Music, Plus, Theater, Users } from 'lucide-react'

interface IEmptyState {
  searchQuery: string
  typeFilter: string
  title: string
  advice: string
  func: any
  action: string
}

const EmptyState: FC<IEmptyState> = ({ searchQuery, typeFilter, title, advice, func, action }) => {
  const dispatch = useAppDispatch()

  const Icon =
    title === 'concerts'
      ? Music
      : title === 'venue'
        ? Theater
        : title === 'Photo Gallery Image'
          ? LucideImage
          : title === 'Question'
            ? Contact
            : Users

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <Icon className="w-10 h-10 text-white/20 mb-4" aria-hidden="true" />

      <p className="font-changa text-lg uppercase tracking-widest text-white/40 mb-2">No {title}s found</p>
      <p className="font-lato text-sm text-white/30 mb-8 max-w-xs leading-relaxed">
        {searchQuery || typeFilter !== 'all' ? 'Try adjusting your search or filters' : advice}
      </p>

      {action && (
        <button
          type="button"
          onClick={() => dispatch(func())}
          className="group inline-flex items-center gap-2 bg-blaze hover:bg-blazehover text-white px-6 py-3 font-changa text-xs uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
        >
          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{action}</span>
        </button>
      )}
    </motion.div>
  )
}

export default EmptyState
