import { getPage } from '@/app/lib/actions/page/getPage'
import { ContactClient } from '@/app/(public)/contact/ContactClient'

export default async function ContactPage() {
  const data = await getPage('contact')
  return <ContactClient data={data} />
}
