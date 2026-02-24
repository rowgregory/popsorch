import { ChangeEvent } from 'react'
import uploadFileToFirebase from './firebase.upload'
import { addPhotoGalleryImageToState, resetPhotoGalleryImage } from '../redux/features/photoGalleryImageSlice'

export const handleUploadPhotoGalleryImage = async (
  event: ChangeEvent<HTMLInputElement>,
  setLoading: (loading: boolean) => void,
  handleUploadProgress: (uploadProgress: number) => void,
  createPhotoGalleryImage: any,
  dispatch: any
) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  setLoading(true)

  const validFiles = Array.from(files).filter(
    (file) => file.type.startsWith('image/') && !file.type.startsWith('image/heic')
  )

  try {
    for (const file of validFiles) {
      const imageUrl = await uploadFileToFirebase(file, handleUploadProgress, 'image')

      const response = await createPhotoGalleryImage({ imageUrl, imageFilename: file.name }).unwrap()
      dispatch(addPhotoGalleryImageToState(response.photoGalleryImage))

      dispatch(resetPhotoGalleryImage())
    }
  } catch {
  } finally {
    setLoading(false)
    event.target.value = '' // allow reselecting the same file(s)
  }
}
