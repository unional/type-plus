import { TypeAnalysis, Type } from './types'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = Type<'null', undefined>
export namespace Null {
  export type Analysis = TypeAnalysis<'null'>
}

const any: Null = { type: 'null', value: undefined }

export const nil = Object.assign({}, any, {
  optional: union.create(any, undef)
})
