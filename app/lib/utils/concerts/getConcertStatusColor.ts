export const getConcertStatusColor = (status: string) => {
  switch (status) {
    case 'all':
      return 'text-red-400 bg-red-400 border-red-400/20'
    case 'Season':
      return 'text-orange-400 bg-orange-400 border-orange-400/20'
    case 'Add-On':
      return 'text-yellow-400 bg-yellow-400 border-yellow-400/20'
    default:
      return 'text-green-400 bg-green-400 border-green-400/20'
  }
}
