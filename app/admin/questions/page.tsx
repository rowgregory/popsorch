'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { QuestionProps, resetQuestionError } from '@/app/redux/features/questionSlice'
import AdminQuestionRow from '@/app/components/admin/AdminQuestionRow'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import { useFetchQuestionsQuery } from '@/app/redux/services/questionApi'

const Questions = () => {
  const { error, noQuestions, questionsCount } = useAppSelector((state: RootState) => state.question)
  const { data, isLoading } = useFetchQuestionsQuery(undefined) as any

  return (
    <>
      <ToastMessage message={error} resetError={() => resetQuestionError()} />
      <div className="mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal title="Questions" total={questionsCount} bgcolor="bg-sky-500" textcolor="text-sky-500" />
      </div>
      {isLoading ? (
        <AdminPageSpinner fill="fill-sky-500" />
      ) : noQuestions ? (
        <div className="font-sm font-lato">No Questions</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[2fr_3fr_3fr_1fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">Name</div>
              <div className="whitespace-nowrap">Email</div>
              <div className="whitespace-nowrap">Date Received</div>
              <div className="whitespace-nowrap">Resolved</div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[600px]">
              {data?.questions?.map((question: QuestionProps) => (
                <AdminQuestionRow key={question.id} question={question} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Questions
