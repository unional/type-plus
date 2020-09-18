import { FixedType } from './typesInternal'
import { undef } from './Undefined'
import { union } from './Union'

export type Null = FixedType<'null'>
export const nil = {
  _type: 'null' as const,
  optional: union.create({ _type: 'null' as const }, undef)
}
