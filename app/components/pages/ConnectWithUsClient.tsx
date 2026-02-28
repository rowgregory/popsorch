'use client'

import NewsletterForm from '@/app/components/forms/NewsletterForm'
import Breadcrumb from '@/app/components/common/Breadcrumb'

export const ConnectWithUsClient = ({ data }) => {
  return (
    <>
      <Breadcrumb breadcrumb="Newsletter" />
      <NewsletterForm data={data} />
    </>
  )
}
