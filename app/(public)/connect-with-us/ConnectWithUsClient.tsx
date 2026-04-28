'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import NewsletterForm from '@/app/components/v2/forms/NewsletterForm'

export const ConnectWithUsClient = ({ data }) => {
  return (
    <>
      <Breadcrumb breadcrumb="Newsletter" />
      <NewsletterForm data={data} />
    </>
  )
}
