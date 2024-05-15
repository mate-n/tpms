export interface IStationery {
  language: string
  template: string
  type: string
  profileID: number | undefined
  recipient: string
  addAdditionalText: boolean
  additionalText: string
}
