import type { Equal } from '../predicates/index.js'
import type { NonNull, NonUndefined } from '../utils/index.js'

export type DropFirst<A extends any[]> = number extends A['length']
  ? A
  : (A['length'] extends 0
    ? never[]
    : (A['length'] extends 1
      ? never[]
      : (A extends [any, ...infer Tail]
        ? Tail
        : never)))

export type DropLast<A extends any[]> = number extends A['length']
  ? A
  : (A['length'] extends 0
    ? never[]
    : (A['length'] extends 1
      ? never[]
      : (A extends [...infer Heads, any]
        ? Heads
        : never)))

type ExcludeUnionOfEmptyTuple<A> = Equal<A, []> extends true ? A : Exclude<A, []>

/**
 * drops entries matching `Criteria` in array or tuple `A`.
 */
export type DropMatch<A extends Readonly<Array<any>>, Criteria> = number extends A['length']
  // array
  ? (A[0] extends Criteria
    // criteria matches: DropAll<string[], string>
    ? never[]
    : (undefined extends Criteria
      ? (null extends Criteria
        ? Array<NonNullable<A[0]>>
        : Array<NonUndefined<A[0]>>)
      : (null extends Criteria
        ? Array<NonNull<A[0]>>
        : (Criteria extends A[0]
          ? Array<Exclude<A[0], Criteria>>
          : (A[0] extends Criteria ? A : Array<Exclude<A[0], Criteria>>)))))
  : DropMatchTuple<A, Criteria>

type DropMatchTuple<A extends Readonly<Array<any>>, Criteria> = A['length'] extends 0
  // empty tuple
  ? A
  : (A extends readonly [infer Head, ...infer Tail]
    ? (Tail['length'] extends 0
      // single element tuple
      ? (undefined extends Criteria
        ? ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
        : ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
      )
      // multiple elements
      : (Exclude<Head, Criteria> extends never
        ? DropMatch<Tail, Criteria>
        : [Exclude<Head, Criteria>, ...DropMatch<Tail, Criteria>]
      ))
    : never[]
  )

export type DropNull<A extends Array<any>> = DropMatch<A, null>
export type DropNullable<A extends Array<any>> = DropMatch<A, null | undefined>
export type DropUndefined<A extends Array<any>> = DropMatch<A, undefined>

/**
 * drop a particular value from an array
 */
export function drop<A extends Readonly<Array<any>>, C>(array: A, value: C): DropMatch<A, C> {
  return array.filter(v => v !== value) as DropMatch<A, C>
}
