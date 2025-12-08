const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  const apiKey = process.env.NEXT_PUBLIC_OPEN_CAGE_API_KEY
  const query = encodeURIComponent(address)
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry
      return { lat, lng }
    } else {
      return null
    }
  } catch {
    return null
  }
}

export default getCoordinatesFromAddress
