import { IsDisjoint } from './IsDisjoint';
import { IsSame } from './IsSame';
import { KeysWithDiffType } from './KeysWithDiffType';

export type ANotB<A extends object, B extends object> =
  IsSame<A, B> extends true ? never :
  IsDisjoint<A, B> extends true ? A :
  {
    [k in Exclude<keyof A, keyof B> | KeysWithDiffType<A, B>]: A[k]
  }

export type BNotA<A extends object, B extends object> = ANotB<B, A>
