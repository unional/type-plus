import { typeSym, valueSym } from '../utils'
import { AnalysisType, ValueType } from './types'

export type Unknown = ValueType<'unknown', undefined>

export namespace Unknown {
  export type Analysis = AnalysisType<'unknown'>
}

export const unknown: Unknown = { [typeSym]: 'unknown', [valueSym]: undefined }
