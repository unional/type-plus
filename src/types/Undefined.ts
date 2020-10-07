import { AnalysisType, ValueType } from './types'

export type Undefined = ValueType<'undefined', undefined>
export namespace Undefined {
  export type Analysis = AnalysisType<'undefined'>
}

export const undef: Undefined = { type: 'undefined', value: undefined }
