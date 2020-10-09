import { ValueOf } from '../ValueOf'
import { IsDisjoint } from './IsDisjoint'
import { AnyRecord } from './AnyRecord'

export type KeysWithDiffType<A extends AnyRecord, B extends AnyRecord> =
  IsDisjoint<A, B> extends true ? never :
  ValueOf<{
    [k in keyof A & keyof B]: A[k] extends B[k] ? never : k
  }>
