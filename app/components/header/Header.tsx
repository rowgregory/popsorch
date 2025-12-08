import React from 'react'
import HeaderLower from './HeaderLower'
import { useAppDispatch } from '@/app/redux/store'
import { setOpenInconspicuousSignInDrawer } from '@/app/redux/features/appSlice'

const Header = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <button
        onClick={() => dispatch(setOpenInconspicuousSignInDrawer())}
        className="fixed top-0 right-0 w-10 h-10 bg-transparent z-[100]"
      />
      <HeaderLower />
    </>
  )
}

export default Header
