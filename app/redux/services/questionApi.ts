import { api } from './api'

const BASE_URL = '/question'

export const questionApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchQuestions: build.query({
      query: () => `${BASE_URL}/fetch-questions`,
      providesTags: ['Question']
    }),
    createQuestion: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-question`, method: 'POST', body }),
      invalidatesTags: ['Question']
    }),
    updateQuestion: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-question`, method: 'PUT', body }),
      invalidatesTags: ['Question']
    }),
    deleteQuestion: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-question`, method: 'DELETE', body }),
      invalidatesTags: ['Question']
    })
  })
})

export const {
  useFetchQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation
} = questionApi
