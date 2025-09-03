import { Music, Users, Award, Eye, Calendar, TrendingUp } from 'lucide-react'

export const sponsorshipTiers = [
  {
    title: 'Season Sponsor',
    price: '$50,000',
    availability: 'One available',
    color: 'from-yellow-400 to-amber-500',
    features: {
      print: [
        'Recognition as Season Sponsor on all printed promotional material, brochures, direct mail and print advertising',
        'Business link on The Pops website',
        'Full-page business ad in each concert program'
      ],
      online: ['Logo with company link on The Pops website', 'Social media posts prior to concerts'],
      email: [
        'Season Sponsor on The Pops email newsletters',
        'Recognition as Season Sponsor on pre-concert press releases'
      ],
      tickets: ['Eight Ultra Level season tickets', "Four tickets to the Pops Orchestra's Donor Reception"],
      additional: ['Acknowledged from the stage at each performance']
    }
  },
  {
    title: 'Concert Sponsor',
    price: '$10,000',
    availability: 'Seven Available',
    color: 'from-amber-500 to-yellow-600',
    features: {
      print: [
        'Recognition as Concert Sponsor on select printed promotional material, brochures, direct mail and print advertising',
        'Half-page business ad in all concert programs'
      ],
      online: ['Logo with company link on The Pops website', 'Social media posts prior to concerts'],
      email: [
        'Recognition as Concert Sponsor on The Pops email newsletters',
        'Recognition as Concert Sponsor on pre-concert press releases'
      ],
      tickets: ['Six Ultra Level tickets to sponsored concert', "Two tickets to the Pops Orchestra's Donor Reception"],
      additional: ['Acknowledged from the stage at sponsored performance']
    }
  },
  {
    title: 'Guest Artist Sponsor',
    price: '$5,000',
    availability: 'Six Available',
    color: 'from-yellow-600 to-amber-600',
    features: {
      print: [
        'Recognition as Guest Artist Sponsor on select printed promotional material, brochures, direct mail and print advertising',
        'Quarter page business ad in all concert programs'
      ],
      online: ['Recognition as Guest Artist Sponsor with company link on The Pops website'],
      additional: ['Acknowledged from the stage at sponsored performance']
    }
  },
  {
    title: 'Principal',
    price: '$1,000',
    color: 'from-yellow-500 to-amber-500',
    features: {
      print: ['Recognition as Principal Sponsor in concert programs']
    }
  },
  {
    title: 'Associate',
    price: '$500',
    color: 'from-amber-400 to-yellow-500',
    features: {
      print: ['Recognition as Associate Sponsor in concert programs']
    }
  },
  {
    title: 'Sustaining',
    price: '$250',
    color: 'from-yellow-400 to-amber-400',
    features: {
      print: ['Recognition as Sustaining Sponsor in concert programs']
    }
  }
]

export const stats = [
  { icon: Users, number: '15,000', label: 'concert attendees' },
  { icon: TrendingUp, number: '10,000+', label: 'MailChimp subscribers' },
  { icon: Eye, number: '50%', label: 'email open rate' },
  { icon: Users, number: '5,000', label: 'website visitors a month during season' },
  { icon: Music, number: '800', label: 'YouTube subscribers' },
  { icon: Award, number: '2,000', label: 'social media follows' }
]

export const benefits = [
  {
    icon: Users,
    title: 'Reach',
    description:
      'Over 15,000 patrons will see your ad this season through attendance at our 16 Bradenton and Sarasota concerts.'
  },
  {
    icon: Award,
    title: 'Recognition',
    description:
      'Your sponsorship reaches an educated, affluent, and discerning market segment and demonstrates your commitment to supporting the arts within the greater Bradenton-Sarasota community.'
  },
  {
    icon: TrendingUp,
    title: 'Alignment',
    description:
      'Your sponsorship supports The Pops, which has been the community orchestra of the Bradenton-Sarasota area for 50 years, providing performance opportunities for talented adults and youth.'
  },
  {
    icon: Eye,
    title: 'Visibility',
    description:
      'All sponsors are recognized in concert programs and on our website. The Pops has a growing social media and YouTube presence. Season, Concert, and Guest Artist sponsors are recognized from the stage at performances.'
  },
  {
    icon: Calendar,
    title: 'Special Invitations and Events',
    description:
      'Sponsors receive invitations to Pops special events and receptions. Complimentary tickets to The Pops concerts are included at various sponsorship levels.'
  },
  {
    icon: Music,
    title: 'Who Benefits',
    description:
      'The Pops brings together accomplished musicians from the Bradenton-Sarasota community who share a passion for performance, offering live music at affordable prices for both local residents and tourists.'
  }
]

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}
