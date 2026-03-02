import { getPage } from '@/app/actions/getPage'
import { StudentScholarshipsClient } from '@/app/components/pages/StudentScholarshipsClient'

export default async function StudentScholarshipsPage() {
  const data = await getPage('student-scholarships')
  return <StudentScholarshipsClient data={data} />
}
