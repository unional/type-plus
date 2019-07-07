import { IsDisjoint } from './IsDisjoint';
import { ValueOf } from './ValueOf';

export type KeysWithDiffType<A extends object, B extends object> =
  IsDisjoint<A, B> extends true ? never :
  ValueOf<{
    [k in keyof A & keyof B]: A[k] extends B[k] ? never : k
  }>
