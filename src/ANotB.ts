import { AnyRecord } from './any-types'
import { IsDisjoint } from './IsDisjoint'
import { IsSame } from './IsSame'
import { KeysWithDiffType } from './KeysWithDiffType'

export type ANotB<A extends AnyRecord, B extends AnyRecord> =
  IsSame<A, B> extends true ? never :
  IsDisjoint<A, B> extends true ? A :
  {
    [k in Exclude<keyof A, keyof B> | KeysWithDiffType<A, B>]: A[k]
  }

export type BNotA<A extends AnyRecord, B extends AnyRecord> = ANotB<B, A>

export type LeftJoin<A extends AnyRecord, B extends AnyRecord> =
  IsSame<A, B> extends true ? A :
  IsDisjoint<A, B> extends true ? A & B:
  {
    [k in Exclude<keyof A, keyof B>]: A[k]
  } & {
    [k in keyof B]: B[k]
  }
