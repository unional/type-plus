import { TypeAnalysis, TypeSpec } from './types'

export type Unknown = TypeSpec<'unknown', undefined>

export namespace Unknown {
  export type Analysis = TypeAnalysis<'unknown'>
}

export const unknown: Unknown = { type: 'unknown', value: undefined }
