import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface PhotoGalleryImageProps {
  id: string
  imageUrl: string
  imageFilename: string
  isHomeHero: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PhotoGalleryImageStatePayload {
  loading: boolean
  error: any
  success: boolean
  photoGalleryImages: PhotoGalleryImageProps[]
  photoGalleryImage: PhotoGalleryImageProps
  photoGalleryImagesCount: number
  noPhotoGalleryImages: boolean
}

const photoGalleryImageState: PhotoGalleryImageProps = {
  id: '',
  imageUrl: '',
  imageFilename: '',
  isHomeHero: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialPhotoGalleryImageState: PhotoGalleryImageStatePayload = {
  loading: true,
  error: null,
  success: false,
  photoGalleryImages: [],
  photoGalleryImage: photoGalleryImageState,
  photoGalleryImagesCount: 0,
  noPhotoGalleryImages: false
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
      state.photoGalleryImagesCount = payload?.length
      state.noPhotoGalleryImages = payload?.length === 0
    },
    resetPhotoGalleryImageError: (state) => {
      state.error = null
    },
    addPhotoGalleryImageToState: (state, { payload }) => {
      state.photoGalleryImages.push(payload)
      state.photoGalleryImagesCount = state.photoGalleryImagesCount + 1
      state.noPhotoGalleryImages = state.photoGalleryImages.length === 0
    },
    updatePhotoGalleryImageInState: (state, { payload }) => {
      const index = state.photoGalleryImages.findIndex((photoGalleryImage) => photoGalleryImage.id === payload.id)
      if (index !== -1) {
        state.photoGalleryImages[index] = payload
      }
    },
    removePhotoGalleryImageFromState: (state, { payload }) => {
      state.photoGalleryImages = state.photoGalleryImages.filter(
        (photoGalleryImage) => photoGalleryImage.id !== payload
      )
      state.photoGalleryImagesCount = state.photoGalleryImagesCount - 1
      state.noPhotoGalleryImages = state.photoGalleryImages.length === 0
    }
  }
})

export const photoGalleryImageReducer = photoGalleryImageSlice.reducer as Reducer<PhotoGalleryImageStatePayload>

export const {
  resetPhotoGalleryImage,
  setPhotoGalleryImages,
  resetPhotoGalleryImageError,
  addPhotoGalleryImageToState,
  updatePhotoGalleryImageInState,
  removePhotoGalleryImageFromState
} = photoGalleryImageSlice.actions
