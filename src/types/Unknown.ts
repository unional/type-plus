import { typeSym } from '../utils'
import { AnalysisType, FixedType } from './types'

export type Unknown = FixedType<'unknown'>

export namespace Unknown {
  export type Analysis = AnalysisType<'unknown'>
}

export const unknown: Unknown = { [typeSym]: 'unknown' }
