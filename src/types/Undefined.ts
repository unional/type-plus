import { TypeAnalysis, TypeSpec } from './types'

export type Undefined = TypeSpec<'undefined', undefined>
export namespace Undefined {
  export type Analysis = TypeAnalysis<'undefined'>
}

export const undef: Undefined = { type: 'undefined', value: undefined }
