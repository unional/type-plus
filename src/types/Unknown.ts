import { AnalysisType, TypeSpec } from './types'

export type Unknown = TypeSpec<'unknown', undefined>

export namespace Unknown {
  export type Analysis = AnalysisType<'unknown'>
}

export const unknown: Unknown = { type: 'unknown', value: undefined }
