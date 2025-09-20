import { setInputs } from '@/app/redux/features/formSlice'
import { useDeleteConcertMutation, useUpdateConcertMutation } from '@/app/redux/services/concertApi'
import { useAppDispatch } from '@/app/redux/store'
import React, { FC, MouseEvent, useState } from 'react'
import Switch from '@/app/forms/elements/Switch'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { ConcertProps, resetConcert, setOpenConcertDrawer } from '@/app/redux/features/concertSlice'
import { decreaseConcertsCount } from '@/app/redux/features/appSlice'
import { Edit, ExternalLink, Music } from 'lucide-react'
import Picture from '../common/Picture'

const AdminConcertCard: FC<{ concert: ConcertProps }> = ({ concert }) => {
  const dispatch = useAppDispatch()
  const [deleteConcert] = useDeleteConcertMutation()
  const [updateConcert] = useUpdateConcertMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [updating, setUpdating] = useState<Record<string, boolean>>({})

  const handleConcertDelete = async (e: MouseEvent, concertId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [concertId]: true }))

    try {
      await deleteConcert({ id: concertId, imageFilename: concert.imageFilename }).unwrap()

      dispatch(resetConcert())
      dispatch(decreaseConcertsCount())
    } catch {}

    setLoading((prev) => ({ ...prev, [concertId]: false }))
  }

  const handleToggleConcertIsOnSale = async (e: any, concertId: string) => {
    e.preventDefault()
    setUpdating((prev) => ({ ...prev, [concertId]: true }))

    try {
      await updateConcert({ id: concertId, isOnSale: e.target.checked }).unwrap()

      dispatch(resetConcert())
    } catch {}

    setUpdating((prev) => ({ ...prev, [concertId]: false }))
  }

  return (
    <div className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 hover:border-neutral-600/60 transition-all">
      {/* Mobile Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
            {concert.imageUrl ? (
              <Picture
                priority={false}
                src={concert.imageUrl}
                alt={concert.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Music className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="md:flex-1 md:min-w-0">
            <h3 className="text-neutral-100 font-semibold text-base leading-tight mb-1 md:truncate">{concert.name}</h3>
            <p className="text-neutral-400 text-sm mb-1">
              {concert.cardDate ||
                (concert?.eventDetails?.[0]?.date &&
                  `${concert.eventDetails[0].date.split(' ')[0]}, ${concert.eventDetails[0].date.split(' ')[2]}`)}
            </p>
            {concert.type && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-500/20 text-pink-300">
                {concert.type}
              </span>
            )}
          </div>
        </div>

        <div className="ml-2">
          <AdminTrashDeleteBtn loading={loading} id={concert.id} handleDelete={handleConcertDelete} />
        </div>
      </div>

      {concert.description && (
        <div className="mb-3">
          <p className="text-neutral-300 text-sm line-clamp-2 leading-relaxed">{concert.description}</p>
        </div>
      )}

      <div className="mb-3">
        <div className="flex items-center justify-between p-3 bg-neutral-800/40 rounded-lg">
          <div className="flex-1 min-w-0">
            <div className="text-neutral-200 font-medium text-sm">Ticket Sales</div>
            <div className="text-neutral-400 text-xs">{concert.isOnSale ? 'Available' : 'Not available'}</div>
          </div>
          <Switch
            enabled={concert.isOnSale}
            onChange={(e: any) => handleToggleConcertIsOnSale(e, concert?.id)}
            isLoading={updating[concert.id]}
            name="isOnSale"
            color="pink-400"
          />
        </div>
      </div>

      {concert.allSeriesExternalLink && (
        <div className="mb-3">
          <a
            href={concert.allSeriesExternalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-neutral-800/40 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-neutral-200 font-medium text-sm">View Series</div>
              <ExternalLink className="w-4 h-4 text-pink-400" />
            </div>
          </a>
        </div>
      )}

      {/* Action Buttons - Mobile */}
      <div className="space-y-2">
        <button
          onClick={() => {
            dispatch(setOpenConcertDrawer())
            dispatch(setInputs({ formName: 'concertForm', data: { ...concert, isUpdating: true } }))
          }}
          className="w-full p-3 bg-neutral-700/40 hover:bg-neutral-600/40 border border-neutral-600/40 hover:border-neutral-500/60 rounded-lg text-neutral-300 font-medium transition-all flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Concert
        </button>
      </div>
    </div>
  )
}

export default AdminConcertCard
