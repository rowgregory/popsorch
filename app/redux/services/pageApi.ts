import { api } from './api'

const BASE_URL = '/page'

export const pageApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createPage: build.mutation({
      query: ({ slug, content }) => ({
        url: BASE_URL,
        method: 'POST',
        body: { slug, content }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            pageApi.util.updateQueryData('getPage', arg.slug, (draft) => {
              return data
            })
          )
        } catch {
          dispatch(pageApi.util.invalidateTags([{ type: 'Page', id: arg.slug }]))
        }
      }
    }),
    getPage: build.query({
      query: (slug) => `${BASE_URL}/${slug}`,
      providesTags: (_, __, slug) => [{ type: 'Page', id: slug }]
    }),
    updatePage: build.mutation({
      query: ({ slug, content }) => ({
        url: `${BASE_URL}/${slug}`,
        method: 'PATCH',
        body: { content }
      }),
      async onQueryStarted({ slug, content }, { dispatch, queryFulfilled }) {
        dispatch(
          pageApi.util.updateQueryData('getPage', slug, (draft) => {
            draft.content = content
          })
        )

        try {
          await queryFulfilled
        } catch {
          dispatch(pageApi.util.invalidateTags([{ type: 'Page', id: slug }]))
        }
      }
    })
  })
})

export const { useCreatePageMutation, useGetPageQuery, useUpdatePageMutation } = pageApi
