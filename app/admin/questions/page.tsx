'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { QuestionProps, resetQuestionError } from '@/app/redux/features/questionSlice'
import AdminQuestionRow from '@/app/components/admin/AdminQuestionRow'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'

const Questions = () => {
  const { questions, error } = useAppSelector((state: RootState) => state.question)
  const { loading, questionCount } = useAppSelector((state: RootState) => state.app)
  const noQuestions = questionCount === 0

  return (
    <div className="relative">
      <ToastMessage message={error} resetError={() => resetQuestionError()} />
      <div className="mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal title="Questions" total={questions?.length} bgcolor="bg-sky-500" textcolor="text-sky-500" />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-sky-500" />
      ) : noQuestions ? (
        <div className="font-sm font-lato">No Questions</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-12 gap-x-3 rounded-md pl-3.5 py-2 pr-2 mb-7 text-sm">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-4">Date Received</div>
              <div className="col-span-1">Resolved</div>
              <div className="col-span-1"></div>
            </div>
            <div className="flex flex-col gap-y-3">
              {questions?.map((question: QuestionProps) => (
                <AdminQuestionRow key={question.id} question={question} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Questions
