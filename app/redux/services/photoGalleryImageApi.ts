import { api } from './api'

const BASE_URL = '/photo-gallery-image'

export const photoGalleryImageApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchPhotoGalleryImages: build.query({
      query: () => `${BASE_URL}/fetch-photo-gallery-images`,
      providesTags: ['Photo-Gallery-Image']
    }),
    createPhotoGalleryImage: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/create-photo-gallery-image`, method: 'POST', body }),
      invalidatesTags: ['Photo-Gallery-Image']
    }),
    updatePhotoGalleryImage: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/update-photo-gallery-image`, method: 'PUT', body }),
      invalidatesTags: ['Photo-Gallery-Image']
    }),
    deletePhotoGalleryImage: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/delete-photo-gallery-image`, method: 'DELETE', body }),
      invalidatesTags: ['Photo-Gallery-Image']
    })
  })
})

export const {
  useFetchPhotoGalleryImagesQuery,
  useCreatePhotoGalleryImageMutation,
  useDeletePhotoGalleryImageMutation,
  useUpdatePhotoGalleryImageMutation
} = photoGalleryImageApi
