import { typeSym, valueSym } from '../utils'
import { AnalysisType, ValueType } from './types'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = ValueType<'null', undefined>
export namespace Null {
  export type Analysis = AnalysisType<'null'>
}

const any: Null = { [typeSym]: 'null', [valueSym]: undefined }

export const nil = Object.assign({}, any, {
  optional: union.create(any, undef)
})
