import { getQuestions } from '@/app/actions/getQuestions'
import AdminQuestions from './page'

export default async function QuestionsLayout() {
  const data = await getQuestions()

  return <AdminQuestions data={data} />
}
