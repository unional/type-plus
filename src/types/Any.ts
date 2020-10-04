import { typeSym } from '../utils'
import { AnalysisType, FixedType } from './types'

export type Any = FixedType<'any'> & Record<any, any>
export namespace Any {
  export type Expectation = FixedType.Expectation<'any'>
  export type Analysis = AnalysisType<'any'>
}
export const any: Any = { [typeSym]: 'any' }
