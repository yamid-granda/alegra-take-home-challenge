export function getTodayStrDate(): string {
  return new Date().toISOString().split('T')[0]
}
