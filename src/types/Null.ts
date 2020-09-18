import { undef } from './Undefined'
import { union } from './Union'

export type Null = { _type: 'null' }
export const nil = {
  _type: 'null' as const,
  optional: union.create({ _type: 'null' as const }, undef)
}
