import { Equal } from '../assertion'
import { If } from './If'

export type And<A extends boolean, B extends boolean> = If<
  Equal<A, true>,
  If<Equal<B, true>, true, false>,
  false
>

export type Or<A extends boolean, B extends boolean> = If<
  Equal<A, true>,
  true,
  If<Equal<B, true>, true, false>
>

export type Xor<A extends boolean, B extends boolean> = If<
  Or<Equal<A, boolean>, Equal<B, boolean>>,
  boolean,
  If<
    Equal<A, true>,
    If<Equal<B, true>, false, true>,
    If<Equal<B, true>, true, false>
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
