import { Music, Gift, TheaterIcon, User, Tent, GalleryHorizontal } from 'lucide-react'
import { setOpenConcertDrawer } from '@/app/redux/features/concertSlice'
import { setOpenSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import { setOpenTeamMemberDrawer } from '@/app/redux/features/teamMemberSlice'
import { setOpenVenueDrawer } from '@/app/redux/features/venueSlice'

export const actionItems = [
  {
    action: 'create-concert',
    label: 'Schedule Concert',
    icon: Music,
    open: setOpenConcertDrawer,
    isDrawer: true
  },
  {
    action: 'create-sponsor',
    label: 'Add Sponsor',
    icon: Gift,
    open: setOpenSponsorDrawer,
    isDrawer: true
  },
  {
    action: 'venue',
    label: 'Set Up Venue',
    icon: TheaterIcon,
    open: setOpenVenueDrawer,
    isDrawer: true
  },
  {
    action: 'board-member-and-staff',
    label: 'Register Team Member',
    icon: User,
    open: setOpenTeamMemberDrawer,
    isDrawer: true
  },
  {
    action: 'export-camp-applications',
    label: 'Export Camp Applications',
    icon: Tent,
    isExport: true
  },
  {
    action: 'upload-photo-gallery-image',
    label: 'Upload Photo Gallery Image',
    icon: GalleryHorizontal,
    isUpload: true
  }
]
