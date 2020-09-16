import { AnyRecord } from './any-types'
import { IsDisjoint } from './IsDisjoint'
import { ValueOf } from './ValueOf'

export type KeysWithDiffType<A extends AnyRecord, B extends AnyRecord> =
  IsDisjoint<A, B> extends true ? never :
  ValueOf<{
    [k in keyof A & keyof B]: A[k] extends B[k] ? never : k
  }>
