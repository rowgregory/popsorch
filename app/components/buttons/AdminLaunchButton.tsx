import Link from 'next/link'

const AdminLaunchButton = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="fixed bottom-5 right-5 z-50 px-6 py-3 rounded-full text-white bg-neutral-900 border-2 border-indigo-600 hover:bg-indigo-600 transition-all shadow-lg font-semibold"
    >
      Launch App
    </Link>
  )
}

export default AdminLaunchButton
