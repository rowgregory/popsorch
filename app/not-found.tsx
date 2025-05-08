import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="px-4 pt-3 pb-[89px]">
      <div className="px-3">
        <div className="max-w-screen-xl w-full mx-auto flex flex-col justify-center items-center">
          <h1 className="font-changa text-[200px]">404</h1>
          <h2 className="text-4xl font-changa -mt-10 mb-12">Oops, page not found!</h2>
          <Link
            href="/"
            className="bg-aquablue px-7 py-4 text-center bg-blaze hover:bg-blazehover text-13 font-changa uppercase font-bold tracking-wider duration-300"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
