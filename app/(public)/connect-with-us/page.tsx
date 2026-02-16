'use client'

import NewsletterForm from '@/app/components/forms/NewsletterForm'
import Breadcrumb from '@/app/components/common/Breadcrumb'

const Newsletter = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Newsletter" />
      <NewsletterForm />
    </>
  )
}

export default Newsletter
