export async function cueboxFetch<T>(path: string): Promise<T | null> {
  const res = await fetch(`${process.env.CUEBOX_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.CUEBOX_API_KEY}`,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 300 } // cache 5 min
  }).catch(() => null)

  if (!res || !res.ok) return null

  const json = await res.json().catch(() => null)
  return json ?? null
}
