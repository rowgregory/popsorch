const getTypeFromFile = (fileName: string): 'image' | 'video' => {
  const extension = fileName?.toLowerCase()?.split?.('.')?.pop()
  const videoExtensions = ['mp4', 'mov', 'avi', 'webm', 'quicktime']
  return videoExtensions.includes(extension || '') ? 'video' : 'image'
}

export default getTypeFromFile
