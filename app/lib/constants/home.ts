import { PageField } from '@/app/types/common.types'

export const sponsorConfig = [
  { level: 'season', title: 'Media Season Sponsors', size: 'large' },
  { level: 'concert', title: 'Media Concert Sponsors', size: 'large' },
  { level: 'guest-artist', title: 'Media Guest Artist Sponsors', size: 'medium' },
  { level: 'principal', title: 'Media Principal Sponsors', size: 'medium' },
  { level: 'associate', title: 'Media Associate Sponsors', size: 'small' },
  { level: 'sustaining', title: 'Media Sustaining Sponsors', size: 'small' }
]

export const pageContent: PageField[] = [
  // Hero Section
  {
    id: 'hero_heading',
    section: 'hero',
    label: 'Hero Heading',
    value: 'The Pops Orchestra of Bradenton and Sarasota',
    type: 'text'
  },
  {
    id: 'hero_subheading',
    section: 'hero',
    label: 'Hero Subheading',
    value: "The premier pops orchestra on Florida's Cultural Coast",
    type: 'text'
  },
  { id: 'hero_btnText', section: 'hero', label: 'Button Text', value: 'See Concerts', type: 'text' },

  // Concerts Section
  {
    id: 'concerts_heading',
    section: 'concerts',
    label: 'Heading',
    value: 'The Pops Orchestra: Music You Love, Musicians You Know • 50 Years of Excellence',
    type: 'textarea'
  },
  {
    id: 'concerts_subheading',
    section: 'concerts',
    label: 'Subheading',
    value: 'Join The Pops as we celebrate our 50th Season',
    type: 'text'
  },
  { id: 'concerts_btnText', section: 'concerts', label: 'Button Text', value: 'View all concerts', type: 'text' },
  { id: 'concerts_btnHref', section: 'concerts', label: 'Button Link', value: '/concerts', type: 'url' },

  // Contact Section
  { id: 'contact_heading', section: 'contact', label: 'Heading', value: 'Keep up to date', type: 'text' },
  {
    id: 'contact_subheading',
    section: 'contact',
    label: 'Subheading',
    value: 'Keep up to date on Pops concerts, news announcements, and special offers.',
    type: 'text'
  },
  { id: 'contact_buttonText', section: 'contact', label: 'Button Text', value: 'Sign me up', type: 'text' },
  { id: 'contact_buttonHref', section: 'contact', label: 'Button Link', value: '/connect-with-us', type: 'url' },
  {
    id: 'contact_trustBadges',
    section: 'contact',
    label: 'Trust Badges',
    value: ['Concert Updates', 'Exclusive Events', 'Early Access'],
    type: 'array'
  },

  // Question Section
  { id: 'question_heading', section: 'question', label: 'Heading', value: 'Have A Question?!', type: 'text' },
  {
    id: 'question_subheading',
    section: 'question',
    label: 'Subheading',
    value: "We'd love to hear from you!  Fill out the contact form below and we will get back to you soon.",
    type: 'textarea'
  },
  { id: 'question_buttonText', section: 'question', label: 'Button Text', value: 'Contact Us', type: 'text' },

  // Contact Method 1 - Email
  { id: 'question_email_title', section: 'question', label: 'Email Title', value: 'Email Us', type: 'text' },
  {
    id: 'question_email_detail',
    section: 'question',
    label: 'Email Address',
    value: 'info@popsorchestra.org',
    type: 'text'
  },
  {
    id: 'question_email_href',
    section: 'question',
    label: 'Email Link',
    value: 'mailto:info@popsorchestra.org',
    type: 'url'
  },
  {
    id: 'question_email_description',
    section: 'question',
    label: 'Email Description',
    value: 'Get in touch via email',
    type: 'text'
  },

  // Contact Method 2 - Phone
  { id: 'question_phone_title', section: 'question', label: 'Phone Title', value: 'Call Us', type: 'text' },
  {
    id: 'question_phone_detail',
    section: 'question',
    label: 'Phone Number',
    value: '941-595-1082 (2087)',
    type: 'text'
  },
  { id: 'question_phone_href', section: 'question', label: 'Phone Link', value: 'tel:941-595-1082', type: 'url' },
  {
    id: 'question_phone_description',
    section: 'question',
    label: 'Phone Description',
    value: 'Mon-Fri 9AM-5PM EST',
    type: 'text'
  },

  // Contact Method 3 - Address
  { id: 'question_address_title', section: 'question', label: 'Address Title', value: 'Visit Us', type: 'text' },
  {
    id: 'question_address_detail',
    section: 'question',
    label: 'Address',
    value: '502 3rd Ave W\nBradenton, FL 34205',
    type: 'textarea'
  },
  {
    id: 'question_address_href',
    section: 'question',
    label: 'Map Link',
    value: 'https://maps.google.com/?q=502+3rd+Ave+W+Bradenton+FL+34205',
    type: 'url'
  },
  {
    id: 'question_address_description',
    section: 'question',
    label: 'Address Description',
    value: 'Come see us in person',
    type: 'text'
  },

  // Sponsors Section
  { id: 'sponsors_heading', section: 'sponsors', label: 'Heading', value: 'Our Sponsors!', type: 'text' },
  {
    id: 'sponsors_subheading',
    section: 'sponsors',
    label: 'Subheading',
    value: 'Thank you to our generous sponsors who support our mission',
    type: 'text'
  }
]
