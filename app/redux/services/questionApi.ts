import { api } from './api'
import { addQuestionToState, removeQuestionFromState, updateQuestionInState } from '../features/questionSlice'

const BASE_URL = '/question'

export const questionApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchQuestions: build.query({
      query: () => `${BASE_URL}/fetch-questions`
    }),
    createQuestion: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-question`, method: 'POST', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addQuestionToState(data.question))
      }
    }),
    updateQuestion: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-question`, method: 'PUT', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(updateQuestionInState(data.question))
      }
    }),
    deleteQuestion: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-question`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        await queryFulfilled
        dispatch(removeQuestionFromState(arg.id))
      }
    })
  })
})

export const {
  useFetchQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation
} = questionApi
