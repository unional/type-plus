import { undef } from './Undefined'
import { union } from './Union'

export type Null = { name: 'null' }
export const nil = {
  name: 'null' as const,
  optional: union.create({ name: 'null' as const }, undef)
}

