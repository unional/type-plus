import { And, Not } from '../conditional'
import { AnyRecord } from './AnyRecord'
import { HasKey } from './hasKey'

export type IsDisjoint<
  A extends AnyRecord,
  B extends AnyRecord
  > = And<Not<HasKey<A, keyof B>>, Not<HasKey<B, keyof A>>>
