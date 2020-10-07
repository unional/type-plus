import { TypeAnalysis, TypeSpec } from './types'

export type Any = TypeSpec<'any', undefined>
export namespace Any {
  export type Analysis = TypeAnalysis<'any'>
}
export const any: Any = { type: 'any', value: undefined }
