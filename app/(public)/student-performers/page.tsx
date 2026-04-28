import { getPage } from '@/app/lib/actions/page/getPage'
import { StudentPerformersClient } from '@/app/(public)/student-performers/StudentPerformersClient'

export default async function StudentPerformersPage() {
  const data = await getPage('student-performers')
  return <StudentPerformersClient data={data} />
}
