'use client'

import React from 'react'
import CreateBtn from '@/app/components/admin/CreateBtn'
import { openCreateDrawer } from '@/app/redux/features/dashboardSlice'
import AdminTestimonialCreateDrawer from '@/app/drawers/AdminTestimonialCreateDrawer'
import AdminTestimonialUpdateDrawer from '@/app/drawers/AdminTestimonialUpdateDrawer'
import AdminTestimonialRow from '@/app/components/admin/AdminTestimonialRow'
import { resetTestimonialError, TestimonialProps } from '@/app/redux/features/testimonialSlice'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import ToastMessage from '@/app/components/common/ToastMessage'
import { RootState, useAppSelector } from '@/app/redux/store'

const Testimonials = () => {
  const { testimonials, error, testimonialsCount, noTestimonials } = useAppSelector(
    (state: RootState) => state.testimonial
  )
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <AdminTestimonialCreateDrawer />
      <AdminTestimonialUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetTestimonialError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Testimonials"
          total={testimonialsCount}
          bgcolor="bg-teal-400"
          textcolor="text-teal-400"
          loading={loading}
          fillcolor="fill-teal-400"
        />
        <CreateBtn
          btnText="Create Testimonial"
          createFunc={openCreateDrawer}
          bgColor="bg-teal-400"
          hvbgcolor="bg-teal-500"
        />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-teal-400" />
      ) : noTestimonials ? (
        <div className="font-sm font-lato">No Testimonials</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[4fr_7fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">Name</div>
              <div className="whitespace-nowrap">Review</div>
              <div className="whitespace-nowrap"></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[600px]">
              {testimonials?.map((testimonial: TestimonialProps) => (
                <AdminTestimonialRow key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Testimonials
