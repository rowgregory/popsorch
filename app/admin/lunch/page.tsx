'use client'

import React, { useState } from 'react'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import { useDeleteLunchMutation, useFetchLunchesQuery } from '@/app/redux/services/lunchApi'
import { openAdminUpdateLunchModal } from '@/app/redux/features/lunchSlice'
import { useAppDispatch } from '@/app/redux/store'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import { trashIcon } from '@/app/lib/icons'
import Spinner from '@/app/components/common/Spinner'

const Lunch = () => {
  const dispatch = useAppDispatch()
  const { isLoading, data, error } = useFetchLunchesQuery({}) as any
  const [deleteLunch, { error: errorDeleteLunch }] = useDeleteLunchMutation() as any
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const submitDeleteLunch = async (e: any, lunch: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [lunch.id]: true }))

    await deleteLunch({ id: lunch.id })
      .unwrap()
      .then(() => {})
      .catch(() => {})

    setLoading((prev) => ({ ...prev, [lunch.id]: false }))
  }

  return (
    <>
      <AdminCommandArea type="LUNCH" btnText="Add New Lunch" />
      {isLoading ? (
        <></>
      ) : error ? (
        <div className="text-sm text-blaze">{error.data.message}</div>
      ) : (
        <div className="flex flex-col gap-y-2">
          {data?.lunches?.map((lunch: any) => (
            <div
              onClick={() => dispatch(openAdminUpdateLunchModal(lunch))}
              key={lunch.id}
              className="grid grid-cols-12 gap-x-4 cursor-pointer"
            >
              <div className="col-span-3">{lunch.host}</div>
              <div className="col-span-2">{lunch.patronCount}</div>
              <div className="col-span-3">{lunch.lunchTime}</div>
              {errorDeleteLunch ? <div>{errorDeleteLunch?.data?.message}</div> : <div className="col-span-3">{lunch.lunchLocation}</div>}
              {loading[lunch.id] ? (
                <Spinner wAndH="w-4 h-4 text-blaze" />
              ) : (
                <AwesomeIcon onClick={(e: any) => submitDeleteLunch(e, lunch)} icon={trashIcon} className="col-span-1 w-4 h-4 text-blaze" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Lunch
