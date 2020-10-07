import { typeSym, valueSym } from '../utils'
import { AnalysisType, ValueType } from './types'

export type Any = ValueType<'any', undefined>
export namespace Any {
  export type Expectation = ValueType.Expectation<'any', undefined>
  export type Analysis = AnalysisType<'any'>
}
export const any: Any = { [typeSym]: 'any', [valueSym]: undefined }
