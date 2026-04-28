// Helper function to check if concert is new (within last 7 days)
const isNewConcert = (createdAt: Date): boolean => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return new Date(createdAt) > sevenDaysAgo
}

export default isNewConcert
