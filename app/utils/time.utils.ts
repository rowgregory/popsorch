export function toTimeInput(date: Date | string) {
  return new Date(date).toTimeString().slice(0, 5)
}
