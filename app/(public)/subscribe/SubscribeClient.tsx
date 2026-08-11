'use client'

import CompactPageHero from '@/app/components/common/CompactPageHero'
import NewsletterForm from '@/app/components/forms/NewsletterForm'

export const SubscribeClient = ({ data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''
  return (
    <main id="main-content">
      <CompactPageHero
        breadcrumb="Newsletter"
        heading={field('connect_with_us_heading')}
        description={field('connect_with_us_subheading')}
      />
      <div className="relative px-4 990:px-12 xl:px-4">
        <NewsletterForm />
      </div>
    </main>
  )
}
