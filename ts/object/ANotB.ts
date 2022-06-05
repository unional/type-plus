import type { Equal } from '../predicates/index.js'
import type { AnyRecord } from './AnyRecord.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeysWithDiffType } from './KeysWithDiffType.js'

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
