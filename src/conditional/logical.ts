import { Equal } from '../assertion'
import { If } from './If'

export type And<A extends boolean, B extends boolean> = If<
  Equal<A, true>,
  B,
  If<
    Equal<B, true>,
    A,
    If<
      Equal<A, boolean>,
      If<Equal<B, boolean>, boolean, false>,
      false
    >
  >
>

export type Or<A extends boolean, B extends boolean> = If<
  Equal<A, true>,
  true,
  If<
    Equal<B, true>,
    true,
    If<
      Equal<A, false>,
      If<Equal<B, false>, false, boolean>,
      boolean
    >
  >
>

/**
 * Logical NOT operator.
 * This version is proposed by @Constantiner
 */
export type Not<X extends boolean> = If<
  Equal<X, true>,
  false,
  If<Equal<X, false>, true, boolean>
>

export type Xor<A extends boolean, B extends boolean> = If<
  Equal<A, true>,
  Not<B>,
  If<
    Equal<B, true>,
    Not<A>,
    If<Equal<A, false>, B, boolean>
  >
>

export type AndS<A extends boolean, B extends boolean> = A extends true ? B extends true ? true : false : false
export type OrS<A extends boolean, B extends boolean> = A extends true ? true : B extends true ? true : false
export type NotS<X extends boolean> = X extends true ? false : true
