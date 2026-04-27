'use server'

import prisma from '@/prisma/client'

const pages = [
  {
    slug: 'home',
    content: [
      {
        id: 'hero_heading',
        type: 'text',
        label: 'Hero Heading',
        value: 'The Pops Orchestra of Bradenton and Sarasota',
        section: 'hero'
      },
      {
        id: 'hero_subheading',
        type: 'text',
        label: 'Hero Subheading',
        value: "The premier pops orchestra on Florida's Cultural Coast!",
        section: 'hero'
      },
      {
        id: 'hero_btnText',
        type: 'text',
        label: 'Button Text',
        value: 'See Concerts',
        section: 'hero'
      },
      {
        id: 'concerts_heading',
        type: 'textarea',
        label: 'Heading',
        value: 'The Pops Orchestra: Music You Love, Musicians You Know • 50 Years of Excellence',
        section: 'concerts'
      },
      {
        id: 'concerts_subheading',
        type: 'text',
        label: 'Subheading',
        value: 'Join The Pops as we celebrate our 50th Season',
        section: 'concerts'
      },
      {
        id: 'concerts_btnText',
        type: 'text',
        label: 'Button Text',
        value: 'View all concerts',
        section: 'concerts'
      },
      {
        id: 'concerts_btnHref',
        type: 'url',
        label: 'Button Link',
        value: '/concerts',
        section: 'concerts'
      },
      {
        id: 'contact_heading',
        type: 'text',
        label: 'Heading',
        value: 'Keep up to date',
        section: 'contact'
      },
      {
        id: 'contact_subheading',
        type: 'text',
        label: 'Subheading',
        value: 'Keep up to date on Pops concerts, news announcements, and special offers.',
        section: 'contact'
      },
      {
        id: 'contact_buttonText',
        type: 'text',
        label: 'Button Text',
        value: 'Sign me up',
        section: 'contact'
      },
      {
        id: 'contact_buttonHref',
        type: 'url',
        label: 'Button Link',
        value: '/connect-with-us',
        section: 'contact'
      },
      {
        id: 'contact_trustBadges',
        type: 'array',
        label: 'Trust Badges',
        value: ['Concert Updates', 'Exclusive Events', 'Early Access'],
        section: 'contact'
      },
      {
        id: 'question_heading',
        type: 'text',
        label: 'Heading',
        value: 'Have A Question?!',
        section: 'question'
      },
      {
        id: 'question_subheading',
        type: 'textarea',
        label: 'Subheading',
        value: "We'd love to hear from you!  Fill out the contact form below and we will get back to you soon.",
        section: 'question'
      },
      {
        id: 'question_buttonText',
        type: 'text',
        label: 'Button Text',
        value: 'Contact Us',
        section: 'question'
      },
      {
        id: 'question_email_title',
        type: 'text',
        label: 'Email Title',
        value: 'Email Us',
        section: 'question'
      },
      {
        id: 'question_email_detail',
        type: 'text',
        label: 'Email Address',
        value: 'info@popsorchestra.org',
        section: 'question'
      },
      {
        id: 'question_email_href',
        type: 'url',
        label: 'Email Link',
        value: 'mailto:info@popsorchestra.org',
        section: 'question'
      },
      {
        id: 'question_email_description',
        type: 'text',
        label: 'Email Description',
        value: 'Get in touch via email',
        section: 'question'
      },
      {
        id: 'question_phone_title',
        type: 'text',
        label: 'Phone Title',
        value: 'Call Us',
        section: 'question'
      },
      {
        id: 'question_phone_detail',
        type: 'text',
        label: 'Phone Number',
        value: '941-926-7677 (POPS)',
        section: 'question'
      },
      {
        id: 'question_phone_href',
        type: 'url',
        label: 'Phone Link',
        value: 'tel:941-926-7677',
        section: 'question'
      },
      {
        id: 'question_phone_description',
        type: 'text',
        label: 'Phone Description',
        value: 'Mon-Fri 9AM-5PM EST',
        section: 'question'
      },
      {
        id: 'question_address_title',
        type: 'text',
        label: 'Address Title',
        value: 'Visit Us',
        section: 'question'
      },
      {
        id: 'question_address_detail',
        type: 'textarea',
        label: 'Address',
        value: '502 3rd Ave W\nBradenton, FL 34205',
        section: 'question'
      },
      {
        id: 'question_address_href',
        type: 'url',
        label: 'Map Link',
        value: 'https://maps.google.com/?q=502+3rd+Ave+W+Bradenton+FL+34205',
        section: 'question'
      },
      {
        id: 'question_address_description',
        type: 'text',
        label: 'Address Description',
        value: 'Come see us in person',
        section: 'question'
      },
      {
        id: 'sponsors_heading',
        type: 'text',
        label: 'Heading',
        value: 'Our Sponsors!',
        section: 'sponsors'
      },
      {
        id: 'sponsors_subheading',
        type: 'text',
        label: 'Subheading',
        value: 'Thank you to our generous sponsors who support our mission',
        section: 'sponsors'
      }
    ]
  },
  {
    slug: 'about',
    content: [
      { id: 'about_hero_eyebrow', type: 'text', label: 'Hero Eyebrow', value: 'Our Story', section: 'hero' },
      { id: 'about_hero_heading', type: 'text', label: 'Hero Heading', value: 'Music That Moves You', section: 'hero' },
      {
        id: 'about_hero_body',
        type: 'textarea',
        label: 'Hero Body',
        value:
          'Founded with a passion for orchestral excellence, The Pops Orchestra has been a cornerstone of the cultural community for decades.',
        section: 'hero'
      },
      { id: 'about_mission_eyebrow', type: 'text', label: 'Mission Eyebrow', value: 'Our Mission', section: 'mission' },
      {
        id: 'about_mission_heading',
        type: 'text',
        label: 'Mission Heading',
        value: 'Inspiring Communities Through Music',
        section: 'mission'
      },
      {
        id: 'about_mission_body',
        type: 'textarea',
        label: 'Mission Body',
        value:
          'We believe in the transformative power of live music and its ability to bring people together across all walks of life.',
        section: 'mission'
      },
      {
        id: 'about_stats',
        type: 'array',
        label: 'Stats',
        value: ['30+ Years of Performances', '100+ Musicians', '10,000+ Annual Attendees'],
        section: 'stats'
      }
    ]
  },
  {
    slug: 'concerts',
    content: [
      { id: 'concerts_hero_eyebrow', type: 'text', label: 'Hero Eyebrow', value: 'This Season', section: 'hero' },
      { id: 'concerts_hero_heading', type: 'text', label: 'Hero Heading', value: 'Live Performances', section: 'hero' },
      {
        id: 'concerts_hero_body',
        type: 'textarea',
        label: 'Hero Body',
        value: 'Explore our upcoming concerts and find the perfect night out.',
        section: 'hero'
      },
      {
        id: 'concerts_filter_label',
        type: 'text',
        label: 'Filter Label',
        value: 'Browse by Category',
        section: 'filter'
      }
    ]
  },
  {
    slug: 'contact',
    content: [
      { id: 'contact_hero_eyebrow', type: 'text', label: 'Hero Eyebrow', value: 'Get in Touch', section: 'hero' },
      {
        id: 'contact_hero_heading',
        type: 'text',
        label: 'Hero Heading',
        value: "We'd Love to Hear From You",
        section: 'hero'
      },
      {
        id: 'contact_hero_body',
        type: 'textarea',
        label: 'Hero Body',
        value:
          "Have a question about tickets, sponsorships, or upcoming events? Reach out and we'll get back to you shortly.",
        section: 'hero'
      },
      { id: 'contact_form_name_label', type: 'text', label: 'Name Field Label', value: 'Full Name', section: 'form' },
      {
        id: 'contact_form_email_label',
        type: 'text',
        label: 'Email Field Label',
        value: 'Email Address',
        section: 'form'
      },
      {
        id: 'contact_form_message_label',
        type: 'text',
        label: 'Message Field Label',
        value: 'Your Message',
        section: 'form'
      },
      {
        id: 'contact_form_submit_label',
        type: 'text',
        label: 'Submit Button Label',
        value: 'Send Message',
        section: 'form'
      }
    ]
  },
  {
    slug: 'donate',
    content: [
      { id: 'donate_hero_eyebrow', type: 'text', label: 'Hero Eyebrow', value: 'Support the Arts', section: 'hero' },
      { id: 'donate_hero_heading', type: 'text', label: 'Hero Heading', value: 'Make Music Possible', section: 'hero' },
      {
        id: 'donate_hero_body',
        type: 'textarea',
        label: 'Hero Body',
        value: 'Your generosity keeps world-class music alive in our community. Every contribution makes a difference.',
        section: 'hero'
      },
      { id: 'donate_impact_heading', type: 'text', label: 'Impact Heading', value: 'Your Impact', section: 'impact' },
      {
        id: 'donate_impact_items',
        type: 'array',
        label: 'Impact Items',
        value: [
          '$25 supports a student musician for one rehearsal',
          '$100 helps fund a full performance evening',
          '$500 sponsors a season concert series'
        ],
        section: 'impact'
      },
      { id: 'donate_cta_label', type: 'text', label: 'Donate Button Label', value: 'Make a Donation', section: 'cta' }
    ]
  },
  {
    slug: 'student-performers',
    content: [
      {
        id: 'student_performers_eyebrow',
        type: 'text',
        label: 'Eyebrow Label',
        value: 'The Pops Orchestra',
        section: 'header'
      },
      {
        id: 'student_performers_heading',
        type: 'text',
        label: 'Page Heading',
        value: 'Student Performers',
        section: 'header'
      },
      {
        id: 'student_performers_body',
        type: 'textarea',
        label: 'Page Body',
        value:
          'Each season, The Pops Orchestra partners with local schools and music programs to give student performers a chance to share the stage with professional musicians.',
        section: 'header'
      },
      {
        id: 'student_performers_eligibility_heading',
        type: 'text',
        label: 'Eligibility Heading',
        value: 'Who Can Apply',
        section: 'eligibility'
      },
      {
        id: 'student_performers_eligibility_items',
        type: 'array',
        label: 'Eligibility Items',
        value: ['Students in grades 6-12', 'Must be enrolled in a school music program', 'Audition required'],
        section: 'eligibility'
      }
    ]
  }
]

export async function seedPages() {
  console.log('Seeding pages...')

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { content: page.content },
      create: {
        slug: page.slug,
        content: page.content
      }
    })
    console.log(`✓ ${page.slug}`)
  }
}
