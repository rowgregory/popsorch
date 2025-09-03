import React, { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import { useFetchTextBlocksQuery, useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import { setCloseModal } from '../redux/features/appSlice'
import { ErrorType } from '../types/common.types'
import { AnimatePresence, motion } from 'framer-motion'

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3
    }
  }
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.3
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

const PublicEditableTextAreaModal = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [updateText, { error }] = useUpdateTextBlockMutation<{ error: ErrorType }>()
  const [loading, setLoading] = useState(false)
  const { openModal, data: modadlData } = useAppSelector((state: RootState) => state.app)
  const { inputs, handleInput, setInputs, setErrors, errors } = useForm({
    [modadlData.textBlockKey]: modadlData.initialValue
  })
  const { success } = useAppSelector((state: RootState) => state.textBlock)
  useFetchTextBlocksQuery(undefined, { skip: !success })

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
    <AnimatePresence>
      {openModal && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[70]"
          onClick={reset}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-inkblack rounded-2xl shadow-2xl overflow-hidden max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div variants={contentVariants} className="px-6 pt-8 pb-6 border-b border-neutral-700">
              <h1 className="text-2xl font-semibold text-white text-center">Edit Text Area</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full" />
            </motion.div>

            {/* Content */}
            <motion.div variants={contentVariants} className="px-6 py-6">
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="relative">
                  {modadlData.textBlockKey === 'countdownTimer' ? (
                    <motion.input
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      type="date"
                      name={modadlData.textBlockKey}
                      value={(inputs[modadlData.textBlockKey] as string) || ''}
                      onChange={handleInput}
                      className="w-full px-4 py-3 border-2 border-neutral-700 rounded-xl bg-inkblack focus:border-blaze focus:outline-none transition-all duration-200 text-white"
                    />
                  ) : (
                    <motion.textarea
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      ref={inputRef}
                      rows={8}
                      name={modadlData.textBlockKey}
                      value={(inputs[modadlData.textBlockKey] as string) || ''}
                      onChange={handleInput}
                      placeholder="Enter your text here..."
                      className="w-full px-4 py-3 border-2 border-neutral-700 rounded-xl bg-inkblack focus:border-blaze focus:outline-none transition-all duration-200 text-white resize-none"
                    />
                  )}

                  <AnimatePresence>
                    {(errors?.textBlock || error?.data?.message) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium"
                      >
                        {errors?.textBlock || error?.data?.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={contentVariants}
              className="px-6 py-6 bg-neutral-800 border-t border-neutral-700 flex items-center justify-between gap-4"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={reset}
                disabled={loading}
                type="button"
                className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Updating...</span>
                  </motion.div>
                ) : (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Update
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PublicEditableTextAreaModal
