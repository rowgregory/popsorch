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
  questions: []
  question: QuestionProps
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
  question: questionState
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
    },
    resetQuestionError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(questionApi.endpoints.fetchQuestions.matchFulfilled, (state, { payload }: any) => {
        state.questions = payload.questions
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

export const { resetQuestion, setQuestions, resetQuestionError } = questionSlice.actions
