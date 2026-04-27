import { useState } from 'react'

export function useFormState<T extends Record<string, unknown>>(initial: T) {
  const [form, setForm] = useState<T>(initial)

  const set = <K extends keyof T>(k: K, v: T[K]) => setForm((f) => ({ ...f, [k]: v }))

  const reset = () => setForm(initial)

  return { form, set, reset, setForm }
}
