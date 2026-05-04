import { getMailchimpMembers } from '@/app/lib/actions/mailchimp/getMailchimpMembers'
import { MailchimpMembersClient } from './MailchimpMembersClient'

export default async function MailchimpMembersPage() {
  const result = await getMailchimpMembers()
  return <MailchimpMembersClient members={result.data.members} count={result.data.totalItems} />
}
