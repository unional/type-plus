import { KeysWithDiffType } from '.'
import { TypeEquals } from '../assertion'
import { If } from '../conditional'
import { AnyRecord } from './AnyRecord'
import { IsDisjoint } from './IsDisjoint'

export type ANotB<A extends AnyRecord, B extends AnyRecord> =
  If<
    TypeEquals<A, B>,
    never,
    If<
      IsDisjoint<A, B>,
      A,
      { [k in Exclude<keyof A, keyof B> | KeysWithDiffType<A, B>]: A[k] }
    >
  >

export type BNotA<A extends AnyRecord, B extends AnyRecord> = ANotB<B, A>

export type LeftJoin<A extends AnyRecord, B extends AnyRecord> =
  If<
    TypeEquals<A, B>,
    A,
    If<
      IsDisjoint<A, B>,
      A & B,
      { [k in Exclude<keyof A, keyof B>]: A[k] }
      & { [k in keyof B]: B[k] }
    >
  >
