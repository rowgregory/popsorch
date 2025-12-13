import { Users, Target, Anchor, User, Music, Theater } from 'lucide-react'
import StatCard from './StatCard'
import { useDashboardSelector } from '@/app/redux/store'

const DashboardStatsGrid = () => {
  const { usersCount, teamMembersCount, sponsorCount, concertsCount, questionCount, venuesCount } =
    useDashboardSelector()

  const stats = [
    {
      title: 'USERS',
      value: usersCount || 0,
      icon: User,
      color: 'from-neutral-600 to-neutral-500',
      tooltip: 'Total Members shows the count of all registered users in your system.'
    },
    {
      title: 'TEAM',
      value: teamMembersCount || 0,
      icon: Users,
      color: 'from-neutral-500 to-neutral-400',
      tooltip:
        'Total Team Members shows the count of all created users in your system, including board members, staff users, and musicians.'
    },
    {
      title: 'SPONSORS',
      value: sponsorCount || 0,
      icon: Target,
      color: 'from-neutral-700 to-neutral-600',
      tooltip: 'This shows the total number of sponsors currently stored in your system.'
    },
    {
      title: 'VENUES',
      value: venuesCount || 0,
      icon: Theater,
      color: 'from-neutral-400 to-neutral-300',
      tooltip: 'This shows the total number of venues currently stored in your system.'
    },
    {
      title: 'CONCERTS',
      value: concertsCount || 0,
      icon: Music,
      color: 'from-neutral-600 to-neutral-700',
      tooltip: 'This shows the total number of concerts currently stored in your system.'
    },
    {
      title: 'QUESTIONS',
      value: questionCount || 0,
      icon: Anchor,
      color: 'from-neutral-500 to-neutral-600',
      tooltip: 'This shows the total number of questions submitted through the contact form.'
    }
  ]

  return (
    <div className="grid grid-cols-2 1100:grid-cols-3 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          tooltip={stat.tooltip}
        />
      ))}
    </div>
  )
}

export default DashboardStatsGrid
