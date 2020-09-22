import { FixedType, typeSym } from '../utils'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = FixedType<'null'>

const any: Null = { [typeSym]: 'null' as const }

export const nil = Object.assign(any, {
  any,
  optional: union.create(any, undef)
})
