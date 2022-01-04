import { TypeAnalysis, Type } from './types'

export type Unknown = Type<'unknown', undefined>

export namespace Unknown {
  export type Analysis = TypeAnalysis<'unknown'>
}

export const unknown: Unknown = { type: 'unknown', value: undefined }
