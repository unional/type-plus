import { FixedType, typeSym } from './typesInternal'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = FixedType<'null'>
export const nil = {
  [typeSym]: 'null' as const,
  optional: union.create({ [typeSym]: 'null' as const }, undef)
}
