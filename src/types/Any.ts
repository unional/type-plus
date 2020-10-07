import { AnalysisType, TypeSpec } from './types'

export type Any = TypeSpec<'any', undefined>
export namespace Any {
  export type Analysis = AnalysisType<'any'>
}
export const any: Any = { type: 'any', value: undefined }
