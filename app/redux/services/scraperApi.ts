import { api } from './api'

const BASE_URL = '/scraper'

export const scraperApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    fetchMenuItems: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/fetch-menu-items`, method: 'POST', body }),
      providesTags: ['Scraper']
    })
  })
})

export const { useFetchMenuItemsMutation } = scraperApi
