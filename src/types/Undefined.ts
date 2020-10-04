import { typeSym } from '../utils'
import { AnalysisType, FixedType } from './types'

export type Undefined = FixedType<'undefined'>
export namespace Undefined {
  export type Analysis = AnalysisType<'undefined'>
}

export const undef: Undefined = { [typeSym]: 'undefined' }
