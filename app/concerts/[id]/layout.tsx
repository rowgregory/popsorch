import React from 'react'
import ConcertDetails from './page'

const ConcertDetailsWrapper = async ({ params }: any) => {
  const concertId = await params
  return <ConcertDetails concertId={concertId} />
}

export default ConcertDetailsWrapper
