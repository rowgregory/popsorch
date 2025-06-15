import { Reducer, createSlice } from '@reduxjs/toolkit'
import { questionApi } from '../services/questionApi'

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
    addQuestionToState: (state, action) => {
      state.questions.push(action.payload)
      state.questionsCount = state.questionsCount + 1
      state.noQuestions = state.questions.length === 0
    },
    updateQuestionInState: (state, action) => {
      const updatedQuestion = action.payload
      const index = state.questions.findIndex((question) => question.id === updatedQuestion.id)
      if (index !== -1) {
        state.questions[index] = updatedQuestion
      }
    },
    removeQuestionFromState: (state, action) => {
      state.questions = state.questions.filter((question) => question.id !== action.payload)
      state.questionsCount = state.questionsCount - 1
      state.noQuestions = state.questions.length === 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(questionApi.endpoints.fetchQuestions.matchFulfilled, (state, { payload }: any) => {
        state.questions = payload.questions
        state.noQuestions = payload.questions.length === 0
        state.questionsCount = payload.questions.length
        state.loading = false
      })
      .addMatcher(questionApi.endpoints.createQuestion.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(questionApi.endpoints.updateQuestion.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(questionApi.endpoints.deleteQuestion.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'questionApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
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
