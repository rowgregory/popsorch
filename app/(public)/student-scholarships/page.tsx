import { getPage } from '@/app/lib/actions/page/getPage'
import { StudentScholarshipsClient } from '@/app/components/pages/StudentScholarshipsClient'

export default async function StudentScholarshipsPage() {
  const data = await getPage('student-scholarships')
  return <StudentScholarshipsClient data={data} />
}
