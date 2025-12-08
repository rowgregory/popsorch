import { setInputs } from '@/app/redux/features/formSlice'
import { useDeleteConcertMutation, useUpdateConcertMutation } from '@/app/redux/services/concertApi'
import { useAppDispatch } from '@/app/redux/store'
import React, { FC, MouseEvent, useState } from 'react'
import Switch from '@/app/forms/elements/Switch'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import {
  removeConcertFromState,
  resetConcert,
  setOpenConcertDrawer,
  updateConcertInState
} from '@/app/redux/features/concertSlice'
import { decreaseConcertsCount } from '@/app/redux/features/appSlice'
import { ArrowUpRight, Calendar, Edit, ExternalLink, Link2Off, Music, Ticket } from 'lucide-react'
import Picture from '../common/Picture'
import { IConcert } from '@/app/types/entities/concert'
import { motion } from 'framer-motion'

const AdminConcertCard: FC<{ concert: IConcert }> = ({ concert }) => {
  const dispatch = useAppDispatch()
  const [deleteConcert] = useDeleteConcertMutation()
  const [updateConcert] = useUpdateConcertMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [updating, setUpdating] = useState<Record<string, boolean>>({})

  const handleConcertDelete = async (e: MouseEvent, concertId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [concertId]: true }))

    try {
      const response = await deleteConcert({ id: concertId, imageFilename: concert.imageFilename }).unwrap()
      dispatch(removeConcertFromState(response.id))
      dispatch(resetConcert())
      dispatch(decreaseConcertsCount())
    } catch {}

    setLoading((prev) => ({ ...prev, [concertId]: false }))
  }

  const handleToggleConcertIsOnSale = async (e: any, concertId: string) => {
    e.preventDefault()
    setUpdating((prev) => ({ ...prev, [concertId]: true }))

    try {
      const response = await updateConcert({ id: concertId, isOnSale: e.target.checked }).unwrap()
      dispatch(updateConcertInState(response.concert))
      dispatch(resetConcert())
    } catch {}

    setUpdating((prev) => ({ ...prev, [concertId]: false }))
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Season':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Add-On':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Sundays-at-Neel':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-4 hover:border-neutral-700/70 transition-all duration-300 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Image */}
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
          {concert.imageUrl ? (
            <Picture
              priority={false}
              src={concert.imageUrl}
              alt={concert.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-600 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Title & Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-white font-bold text-sm line-clamp-1 leading-tight">{concert.name}</h3>

            {/* Edit Button */}
            <button
              onClick={() => {
                dispatch(setOpenConcertDrawer())
                dispatch(setInputs({ formName: 'concertForm', data: { ...concert, isUpdating: true } }))
              }}
              className="flex-shrink-0 p-1.5 bg-neutral-800/50 hover:bg-neutral-700 rounded-md transition-colors group"
              title="Edit concert"
            >
              <Edit className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3 h-3 text-neutral-500" />
            <span className="text-xs text-neutral-400">
              {concert.cardDate ||
                (concert?.eventDetails?.[0]?.date &&
                  `${concert.eventDetails[0].date.split(' ')[0]}, ${concert.eventDetails[0].date.split(' ')[2]}`)}
            </span>
          </div>

          {/* Type Badge */}
          {concert.type && (
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getBadgeColor(
                concert.type
              )}`}
            >
              {concert.type === 'Sundays-at-Neel' ? 'Sundays' : concert.type}
            </span>
          )}
        </div>

        {/* Delete Button */}
        <AdminTrashDeleteBtn loading={loading} id={concert.id} handleDelete={handleConcertDelete} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2">
        {/* Ticket Sales Toggle */}
        <div className="bg-neutral-800/30 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[10px] text-neutral-400 font-medium">Tickets</span>
            </div>
            <Switch
              enabled={concert.isOnSale}
              onChange={(e: any) => handleToggleConcertIsOnSale(e, concert?.id)}
              isLoading={updating[concert.id]}
              name="isOnSale"
              color="blaze"
            />
          </div>
          <span className={`text-[10px] font-medium ${concert.isOnSale ? 'text-white' : 'text-neutral-500'}`}>
            {concert.isOnSale ? 'On Sale' : 'Unavailable'}
          </span>
        </div>

        {/* External Link */}
        {concert.allSeriesExternalLink ? (
          <a
            href={concert.allSeriesExternalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-800/30 rounded-lg p-2.5 hover:bg-neutral-800/50 transition-all group/link"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-white transition-colors" />
                <span className="text-[10px] text-neutral-400 font-medium group-hover/link:text-white transition-colors">
                  Series
                </span>
              </div>
              <ArrowUpRight className="w-2.5 h-2.5 text-neutral-600 group-hover/link:text-neutral-400 transition-colors" />
            </div>
            <span className="text-[10px] font-medium text-neutral-300 group-hover/link:text-white transition-colors">
              View Details
            </span>
          </a>
        ) : (
          <div className="bg-neutral-800/20 rounded-lg p-2.5 opacity-50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Link2Off className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-[10px] text-neutral-500 font-medium">Series</span>
            </div>
            <span className="text-[10px] font-medium text-neutral-600">No Link</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AdminConcertCard
