import { getPage } from '@/app/actions/getPage'
import { StudentPerformersClient } from '@/app/components/pages/StudentPerformersClient'

export default async function StudentPerformersPage() {
  const data = await getPage('student-performers')
  return <StudentPerformersClient data={data} />
}
