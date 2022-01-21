export function parseDataNow (value: string): number {
  const dd = value.slice(0, 2)
  const mm = value.slice(3, 5)
  const yy = value.slice(6)
  const getDate = new Date(`20${yy}-${mm}-${dd}`)
  const nowDate = new Date()
  return Math.ceil((getDate.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24))
}

export function parseDateValueToInt (value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''))
}

export function parseDateForItem (value: string): number {
  const day = value.slice(0, 2)
  const month = value.slice(3, 5)
  const year = value.slice(6)
  return parseInt('20' + year + month + day)
}
