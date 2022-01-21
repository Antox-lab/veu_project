export interface IContentCalendar {
  day: number,
  indexes?: {
    name: string,
    index: number,
    color: number
  }[]
}

export interface ICurrentObject {
  name: string,
  index: number,
  color: number
}
