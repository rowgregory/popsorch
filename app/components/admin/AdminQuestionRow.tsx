import React, { FC, useState } from 'react'
import AdminCheckbox from '@/app/forms/elements/AdminCheckbox'
import { QuestionProps, removeQuestionFromState, updateQuestionInState } from '@/app/redux/features/questionSlice'
import { useDeleteQuestionMutation, useUpdateQuestionMutation } from '@/app/redux/services/questionApi'
import { formatDate } from '@/app/utils/date.functions'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { useAppDispatch } from '@/app/redux/store'
import { decreaseQuestionCount } from '@/app/redux/features/appSlice'

const AdminQuestionRow: FC<{ question: QuestionProps }> = ({ question }) => {
  const dispatch = useAppDispatch()
  const [updateQuestion] = useUpdateQuestionMutation()
  const [deleteQuestion] = useDeleteQuestionMutation()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({})
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleUpdateQuestion = async (e: any, questionId: string) => {
    e.stopPropagation()
    setIsLoading({ [questionId]: true })

    try {
      const response = await updateQuestion({ id: questionId, hasResponded: e.target.checked }).unwrap()
      dispatch(updateQuestionInState(response.question))
    } catch {
    } finally {
      setIsLoading({ [questionId]: false })
    }
  }

  const handleQuestionDelete = async (e: any, questionId: string) => {
    e.stopPropagation()
    setIsDeleting({ [questionId]: true })

    try {
      const response = await deleteQuestion({ id: questionId }).unwrap()
      dispatch(removeQuestionFromState(response.id))
      dispatch(decreaseQuestionCount())
    } catch {
    } finally {
      setIsDeleting({ [questionId]: false })
    }
  }

  const toggleExpandedRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null)
    } else {
      setExpandedRow(id)
    }
  }

  return (
    <>
      <div className="grid grid-cols-[2fr_3fr_3fr_1fr_1fr] h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-sky-500 items-center cursor-pointer">
        <div className="truncate" onClick={() => toggleExpandedRow(question.id)}>
          {question.name}
        </div>
        <div className="truncate" onClick={() => toggleExpandedRow(question.id)}>
          {question.email}
        </div>
        <div className="truncate" onClick={() => toggleExpandedRow(question.id)}>
          {formatDate(question.createdAt, { minute: 'numeric', hour: 'numeric', second: 'numeric' })}
        </div>

        <div className="truncate">
          <AdminCheckbox
            name="hasResponded"
            value={question.hasResponded}
            handleToggle={(e: any) => handleUpdateQuestion(e, question.id)}
            label=""
            isLoading={isLoading[question.id]}
          />
        </div>
        <div className="truncate">
          <AdminTrashDeleteBtn loading={isDeleting} id={question?.id} handleDelete={handleQuestionDelete} />
        </div>
      </div>
      {expandedRow === question.id && (
        <div className="grid grid-cols-12 gap-y-3 bg-midnightblack px-4 py-4 rounded-[5px]">
          <div className="col-span-12 text-sm font-lato text-sky-500">
            Question: <span className="text-white">{question.message}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminQuestionRow
