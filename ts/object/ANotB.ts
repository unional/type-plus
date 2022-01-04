import { Equal } from '../predicates'
import { AnyRecord } from './AnyRecord'
import { IsDisjoint } from './IsDisjoint'
import { KeysWithDiffType } from './KeysWithDiffType'

export type ANotB<A extends AnyRecord, B extends AnyRecord> =
  Equal<A, B> extends true
  ? never
  : (IsDisjoint<A, B> extends true
    ? A
    : { [k in Exclude<keyof A, keyof B> | KeysWithDiffType<A, B>]: A[k] })

export type BNotA<A extends AnyRecord, B extends AnyRecord> = ANotB<B, A>

export type LeftJoin<A extends AnyRecord, B extends AnyRecord> =
  Equal<A, B> extends true
  ? A
  : (IsDisjoint<A, B> extends true
    ? A & B
    : { [k in Exclude<keyof A, keyof B>]: A[k] } & { [k in keyof B]: B[k] }
  )
