'use server'

export async function getMailchimpMemberCount() {
  const API_KEY = process.env.MAILCHIMP_API_KEY!
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!

  if (!API_KEY || !LIST_ID) return { success: false, count: 0 }

  const DATACENTER = API_KEY.split('-')[1]

  try {
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members?count=1&offset=0`,
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) return { success: false, count: 0 }

    const data = await response.json()
    return { success: true, count: data.total_items as number }
  } catch {
    return { success: false, count: 0 }
  }
}
