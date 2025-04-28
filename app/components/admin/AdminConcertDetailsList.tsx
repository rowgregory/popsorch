import { openBottomOverlayDrawer } from '@/app/redux/features/dashboardSlice'
import React, { DragEvent, useState } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { trashIcon } from '@/app/lib/icons'
import { useAppDispatch } from '@/app/redux/store'

const AdminConcertDetailsList = ({ concert, removeConcertDetails, setInputs }: any) => {
  const dispatch = useAppDispatch()
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const removeConcert = (e: MouseEvent, eventId: string) => {
    e.stopPropagation()
    removeConcertDetails(eventId)
  }

  // Handle the drag start event
  const handleDragStart = (e: DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.setData('text/plain', String(index)) // Store the dragged index
  }

  // Handle the drag over event (allowing dropping)
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  // Handle the drop event to rearrange items
  const handleDrop = (e: DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex !== null) {
      const newEventDetails = [...concert.inputs.eventDetails]
      const draggedEvent = newEventDetails[draggedIndex]

      // Remove the dragged item from its original position
      newEventDetails.splice(draggedIndex, 1)

      // Insert it into the new position
      newEventDetails.splice(dropIndex, 0, draggedEvent)

      // Update the state with the new order
      dispatch(setInputs({ eventDetails: newEventDetails }))
      setDraggedIndex(null) // Reset the dragged item index
    }
  }

  interface EventDetailProps {
    id: string
    time: string
    date: string
    city: string
    dayOfWeek: string
    location: { venueId: string; name: string }
    externalLink: string
  }

  const openConcertDetailsDrawer = (eventDetail: EventDetailProps) => {
    dispatch(openBottomOverlayDrawer('details'))
    setInputs({
      eventDetailId: eventDetail.id,
      time: eventDetail.time,
      date: eventDetail.date,
      city: eventDetail.city,
      dayOfWeek: eventDetail.dayOfWeek,
      location: eventDetail.location,
      externalLink: eventDetail.externalLink
    })
  }

  return (
    <div className="w-full flex flex-col gap-y-5">
      {concert?.inputs?.eventDetails?.map((eventDetail: EventDetailProps, i: number) => (
        <div
          key={eventDetail.id}
          className="px-5 py-4 bg-midnightblack grid grid-cols-12 gap-x-4 border-l-4 border-l-pink-400 cursor-pointer hover:shadow-md duration-300 hover:-translate-y-0.5 gap-y-1"
          draggable
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i)}
          onClick={() => openConcertDetailsDrawer(eventDetail)}
        >
          <div className="col-span-11">{eventDetail.time}</div>
          <AwesomeIcon
            onClick={(e: any) => removeConcert(e, eventDetail.id)}
            icon={trashIcon}
            className="w-4 h-4 text-pink-400 col-span-1"
          />
          <div className="col-span-12">{eventDetail.dayOfWeek}</div>
          <div className="col-span-12">{eventDetail.city}</div>
          <div className="col-span-12">{eventDetail.date}</div>
          <div className="col-span-12">{eventDetail?.location?.name}</div>
        </div>
      ))}
    </div>
  )
}

export default AdminConcertDetailsList
