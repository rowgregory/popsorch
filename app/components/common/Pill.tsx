import { StatusEnum } from '@/app/redux/features/mailchimpSlice'

export interface PillProps {
  status: StatusEnum
}

const Pill: React.FC<PillProps> = ({ status }) => {
  let pillColor = ''

  switch (status) {
    case 'subscribed':
      pillColor = 'bg-lime-600'
      break
    case 'unsubscribed':
      pillColor = 'bg-purple-500'
      break
    case 'cleaned':
      pillColor = 'bg-zinc-500'
      break
    case 'pending':
      pillColor = 'bg-yellow-500'
      break
    case 'non_member':
      pillColor = 'bg-blue-500'
      break
    case 'archived':
      pillColor = 'bg-gray-500'
      break
    default:
      pillColor = 'bg-gray-500'
      break
  }

  return <span className={`inline-block text-sm px-4 font-changa py-1 rounded-full ${pillColor}`}>{status}</span>
}

export default Pill
