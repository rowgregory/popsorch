import { getPage } from '@/app/lib/actions/page/getPage'
import { StudentScholarshipsClient } from '@/app/(public)/student-scholarships/StudentScholarshipsClient'

export default async function StudentScholarshipsPage() {
  const data = await getPage('student-scholarships')
  return <StudentScholarshipsClient data={data} />
}
