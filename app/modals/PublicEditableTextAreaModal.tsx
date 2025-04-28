import React, { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import Spinner from '../components/common/Spinner'
import { setCloseModal } from '../redux/features/appSlice'
import PublicModal from '../components/common/PublicModal'
import { ErrorType } from '../types/common.types'

const PublicEditableTextAreaModal = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [updateText, { error }] = useUpdateTextBlockMutation<{ error: ErrorType }>()
  const [loading, setLoading] = useState(false)
  const { openModal, data: modadlData } = useAppSelector((state: RootState) => state.app)
  const { inputs, handleInput, setInputs, setErrors, errors } = useForm({
    [modadlData.textBlockKey]: modadlData.initialValue
  })

  useEffect(() => {
    if (modadlData.initialValue) {
      setInputs({ [modadlData.textBlockKey]: modadlData.initialValue })
    }

    if (inputRef.current instanceof HTMLInputElement) {
      inputRef.current.focus()
    }
  }, [modadlData, setInputs])

  const handleUpdate = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    // Function to get only the changed values
    const getChangedValues = () => {
      const changedValues: Record<string, string | number | boolean | unknown> = {}
      Object.keys(inputs).forEach((key: any) => {
        if (inputs[key] !== modadlData.initialValue?.[key]) {
          changedValues[key] = inputs[key]
        }
      })
      return changedValues
    }

    const changedValues = getChangedValues()

    const hasEmptyValues = Object.values(changedValues).some((value) => value === '')
    if (hasEmptyValues) {
      setErrors({ textBlock: 'Can not leave blank' })
      setLoading(false)
      return
    }

    await updateText({ ...changedValues, type: modadlData.type })
      .unwrap()
      .then(() => reset())
      .catch(() => {})

    setLoading(false)
  }

  const reset = () => {
    dispatch(setCloseModal())
    setInputs({})
  }

  return (
    <PublicModal show={openModal} reset={reset}>
      <div className="px-4 pt-12 480:py-20 480:mb-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <h1 className="font-medium text-stealthGray text-xl mt-2 mb-4">Edit Text Area</h1>
        <form onSubmit={handleUpdate} className="w-full grid grid-cols-12 items-end relative">
          {modadlData.textBlockKey === 'countdownTimer' ? (
            <input
              type="date"
              name={modadlData.textBlockKey}
              value={(inputs[modadlData.textBlockKey] as string) || ''}
              onChange={handleInput}
              className={`col-span-12 p-3 border-1 border-gray-300 bg-transparent relative focus:outline-none w-full break-words`}
            />
          ) : (
            <textarea
              ref={inputRef}
              rows={8}
              name={modadlData.textBlockKey}
              value={(inputs[modadlData.textBlockKey] as string) || ''}
              onChange={handleInput}
              className={`col-span-12 p-3 border-1 border-gray-300 bg-transparent relative focus:outline-none w-full break-words`}
            />
          )}
          {(errors?.textBlock || error?.data?.message) && (
            <div className={`text-xs absolute -bottom-6 text-blaze font-semibold col-span-12`}>
              {errors?.textBlock || error?.data?.message}
            </div>
          )}
        </form>
      </div>
      <div className="bg-silver p-3 480:py-6 480:px-5 w-full flex items-center justify-between">
        <button
          onClick={reset}
          disabled={loading}
          type="button"
          className="bg-gray-800 py-1.5 w-36 text-white disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="min-w-36 bg-blaze py-1.5 w-36 text-white disabled:cursor-not-allowed"
        >
          {loading ? <Spinner wAndH="w-4 h-4" fill="fill-gray-800" /> : 'Update'}
        </button>
      </div>
    </PublicModal>
  )
}

export default PublicEditableTextAreaModal
