import { AnalysisType, ValueType } from './types'

export type Any = ValueType<'any', undefined>
export namespace Any {
  export type Analysis = AnalysisType<'any'>
}
export const any: Any = { type: 'any', value: undefined }
