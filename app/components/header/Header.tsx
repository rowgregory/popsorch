import HeaderLower from './HeaderLower'
import { useAuthSelector } from '@/app/redux/store'
import Link from 'next/link'

const Header = ({ concerts }) => {
  const { isAuthenticated } = useAuthSelector()

  return (
    <>
      {isAuthenticated && <Link href="/admin/dashboard" className="fixed top-0 right-0 w-10 h-10 z-[150]" />}
      {!isAuthenticated && <Link href="/auth/login" className="fixed top-0 right-0 w-10 h-10 z-[150]" />}
      <HeaderLower concerts={concerts} />
    </>
  )
}

export default Header
