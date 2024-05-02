export interface IProfilePreferencesPatchBody {
  id: number
  preferencesNote: string
  preferencesFeatureIDs: number[]
  preferencesDefaultObjectID: number | undefined
  preferencesLanguage: string
}
