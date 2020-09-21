import { FixedType, typeSym } from '../utils'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = FixedType<'null'>

const n: Null = { [typeSym]: 'null' as const }
export const nil = Object.assign(n, {
  optional: union.create(n, undef)
})
