import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface QuestionProps {
  id: string
  name: string
  email: string
  message: string
  hasResponded: boolean
  createdAt: Date
  updatedAt: Date
}

export interface QuestionStatePayload {
  loading: boolean
  error: any
  success: boolean
  questions: QuestionProps[]
  question: QuestionProps
  questionsCount: number
  noQuestions: boolean
}

const questionState: QuestionProps = {
  id: '',
  name: '',
  email: '',
  message: '',
  hasResponded: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialQuestionState: QuestionStatePayload = {
  loading: true,
  error: null,
  success: false,
  questions: [],
  question: questionState,
  questionsCount: 0,
  noQuestions: false
}

export const questionSlice = createSlice({
  name: 'question',
  initialState: initialQuestionState,
  reducers: {
    resetQuestion: (state) => {
      state.error = null
      state.question = questionState
    },
    setQuestions: (state, { payload }: any) => {
      state.questions = payload
      state.questionsCount = payload?.length
      state.noQuestions = payload?.length === 0
    },
    resetQuestionError: (state) => {
      state.error = null
    },
    addQuestionToState: (state, { payload }) => {
      state.questions.push(payload)
      state.questionsCount = state.questionsCount + 1
      state.noQuestions = state.questions.length === 0
    },
    updateQuestionInState: (state, { payload }) => {
      const updatedQuestion = payload
      const index = state.questions.findIndex((question) => question.id === updatedQuestion.id)
      if (index !== -1) {
        state.questions[index] = updatedQuestion
      }
    },
    removeQuestionFromState: (state, { payload }) => {
      state.questions = state.questions.filter((question) => question.id !== payload)
      state.questionsCount = state.questionsCount - 1
      state.noQuestions = state.questions.length === 0
    }
  }
})

export const questionReducer = questionSlice.reducer as Reducer<QuestionStatePayload>

export const {
  resetQuestion,
  setQuestions,
  resetQuestionError,
  addQuestionToState,
  updateQuestionInState,
  removeQuestionFromState
} = questionSlice.actions
