'use client'

import React from 'react'
import CreateBtn from '@/app/components/admin/CreateBtn'
import { openCreateDrawer } from '@/app/redux/features/dashboardSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminTestimonialCreateDrawer from '@/app/drawers/AdminTestimonialCreateDrawer'
import AdminTestimonialUpdateDrawer from '@/app/drawers/AdminTestimonialUpdateDrawer'
import AdminTestimonialRow from '@/app/components/admin/AdminTestimonialRow'
import { resetTestimonialError, TestimonialProps } from '@/app/redux/features/testimonialSlice'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import ToastMessage from '@/app/components/common/ToastMessage'

const Testimonials = () => {
  const { testimonials, error } = useAppSelector((state: RootState) => state.testimonial)
  const { loading, noTestimonials, testimonialsCount } = useAppSelector((state: RootState) => state.app)

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
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-12 gap-x-3 rounded-md pl-3.5 py-2 pr-2 mb-7 text-sm">
              <div className="col-span-3">Name</div>
              <div className="col-span-8">Review</div>
              <div className="col-span-1"></div>
            </div>
            <div className="flex flex-col gap-y-3">
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
