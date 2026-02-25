import { ChangeEvent } from 'react'
import uploadFileToFirebase from './firebase.upload'
import { showToast } from '../redux/features/toastSlice'

export const handleUploadPhotoGalleryImage = async (
  event: ChangeEvent<HTMLInputElement>,
  setLoading: (loading: boolean) => void,
  handleUploadProgress: (uploadProgress: number) => void,
  createPhotoGalleryImage: any,
  dispatch: any,
  router: any
) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  const validFiles = Array.from(files).filter(
    (file) => file.type.startsWith('image/') && !file.type.startsWith('image/heic')
  )

  try {
    setLoading(true)
    for (const file of validFiles) {
      const imageUrl = await uploadFileToFirebase(file, handleUploadProgress, 'image')

      await createPhotoGalleryImage({ imageUrl, imageFilename: file.name }).unwrap()
      router.refresh()
      dispatch(showToast({ message: 'Successfully uploaded image!', type: 'success' }))
    }
  } catch {
    dispatch(showToast({ message: 'Failed to upload image', type: 'error' }))
  } finally {
    setLoading(false)
    event.target.value = '' // allow reselecting the same file(s)
  }
}
