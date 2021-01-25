import { Equal } from './Equal'

export type And<A extends boolean, B extends boolean> =
  (Equal<A, true> extends true ?
    B :
    (Equal<B, true> extends true ?
      A :
      (Equal<A, boolean> extends true ?
        Equal<B, boolean> extends true ? boolean : false :
        false)
    )
  )

export type Or<A extends boolean, B extends boolean> =
  (Equal<A, true> extends true ?
    true :
    (Equal<B, true> extends true ?
      true :
      (
        Equal<A, false> extends true ?
        Equal<B, false> extends true ? false : boolean :
        boolean
      )
    )
  )

/**
 * Logical NOT operator.
 * This version is proposed by @Constantiner
 */
export type Not<X extends boolean> =
  (Equal<X, true> extends true ?
    false :
    Equal<X, false> extends true ? true : boolean
  )
export type Xor<A extends boolean, B extends boolean> =
  (Equal<A, true> extends true ?
    Not<B> :
    (Equal<B, true> extends true ?
      Not<A> :
      Equal<A, false> extends true ? B : boolean
    )
  )

export type AndS<A extends boolean, B extends boolean> = A extends true ? B extends true ? true : false : false
export type OrS<A extends boolean, B extends boolean> = A extends true ? true : B extends true ? true : false
export type NotS<X extends boolean> = X extends true ? false : true
