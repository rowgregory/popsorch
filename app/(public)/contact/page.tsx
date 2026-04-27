import { getPage } from '@/app/lib/actions/page/getPage'
import { ContactClient } from '@/app/components/pages/ContactClient'

export default async function ContactPage() {
  const data = await getPage('contact')
  return <ContactClient data={data} />
}
