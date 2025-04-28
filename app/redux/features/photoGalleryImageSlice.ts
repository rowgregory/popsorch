import { Reducer, createSlice } from '@reduxjs/toolkit'
import { photoGalleryImageApi } from '../services/photoGalleryImageApi'

export interface PhotoGalleryImageProps {
  id: string
  imageUrl: string
  imageFilename: string
  createdAt: Date
  updatedAt: Date
}

export interface PhotoGalleryImageStatePayload {
  loading: boolean
  error: any
  success: boolean
  photoGalleryImages: []
  photoGalleryImage: PhotoGalleryImageProps
}

const photoGalleryImageState: PhotoGalleryImageProps = {
  id: '',
  imageUrl: '',
  imageFilename: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialPhotoGalleryImageState: PhotoGalleryImageStatePayload = {
  loading: true,
  error: null,
  success: false,
  photoGalleryImages: [],
  photoGalleryImage: photoGalleryImageState
}

export const photoGalleryImageSlice = createSlice({
  name: 'photoGalleryImage',
  initialState: initialPhotoGalleryImageState,
  reducers: {
    resetPhotoGalleryImage: (state) => {
      state.error = null
      state.photoGalleryImage = photoGalleryImageState
    },
    setPhotoGalleryImages: (state, { payload }: any) => {
      state.photoGalleryImages = payload
    },
    resetPhotoGalleryImageError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(photoGalleryImageApi.endpoints.fetchPhotoGalleryImages.matchFulfilled, (state, { payload }: any) => {
        state.photoGalleryImages = payload.photoGalleryImages
        state.loading = false
      })
      .addMatcher(photoGalleryImageApi.endpoints.createPhotoGalleryImage.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(photoGalleryImageApi.endpoints.deletePhotoGalleryImage.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'photoGalleryApi',
        (state, { payload }: any) => {
          state.loading = false
          state.success = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const photoGalleryImageReducer = photoGalleryImageSlice.reducer as Reducer<PhotoGalleryImageStatePayload>

export const { resetPhotoGalleryImage, setPhotoGalleryImages, resetPhotoGalleryImageError } =
  photoGalleryImageSlice.actions
