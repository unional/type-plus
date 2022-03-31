import { DigitArray, IsPositive, IsWhole } from '../math'
import { KeyTypes } from '../object'
import { Equal, IsAny } from '../predicates'

/**
 * Gets the common property keys of the elements in `A`.
 */
export type CommonPropKeys<A extends Record<string, unknown>[]> = A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? keyof A[0]
    : (A['length'] extends 2
      ? keyof A[0] & keyof A[1]
      : keyof A[0] & keyof A[1] & CommonPropKeys<Tail<Tail<A>>>))

/**
 * Gets the common property keys of the elements in `A`.
 * This will be deprecated in 4.0. Please use CommonPropKeys instead.
 */
export type CommonKeys<A extends Record<string, any>[]> = CommonPropKeys<A>

export type Concat<A extends any[], B extends any[]> = [...A, ...B]


/**
 * Creates `Tuple<T>` with `L` number of elements.
 * @note Other cool implementations by @lazytype, @jcalz:
 * @see https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674514787
 * @see https://github.com/microsoft/TypeScript/issues/47874#issuecomment-1039157322
 */
export type CreateTuple<L extends number, T = any, Fail = never> =
  number extends L ? T[] : IsPositive<L> extends true ? IsWhole<L> extends true
  ? DigitArray.ToTuple<[], DigitArray.FromNumber<L>, T>
  : Fail : Fail

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
export type DropMatch<A extends Array<any>, Criteria> =
  number extends A['length']
  // array
  ? (A[0] extends Criteria
    // criteria matches: DropAll<string[], string>
    ? never[]
    : (undefined extends Criteria
      ? Array<NonNullable<A[0]>>
      // TODO: A[0] extends Criteria?
      : (Criteria extends A[0] ? Array<Exclude<A[0], Criteria>> : A))
  )
  : DropMatchTuple<A, Criteria>

type DropMatchTuple<A extends Array<any>, Criteria> =
  (A['length'] extends 0
    // empty tuple
    ? A
    : (A extends [infer Head, ...infer Tail]
      ? (Tail['length'] extends 0
        // single element tuple
        ? (undefined extends Criteria
          ? (Head extends Criteria
            ? []
            : [Head])
          : ExcludeUnionOfEmptyTuple<(Head extends Criteria ? [] : [Head])>
        )
        // multiple elements
        : (Exclude<Head, Criteria> extends never
          ? DropMatch<Tail, Criteria>
          : [Exclude<Head, Criteria>, ...DropMatch<Tail, Criteria>]
        ))
      : never[]))

/**
* filter the array or tuple `A`, keeping entries satisfying `Criteria`.
* @deprecated renaming to `KeepMatch`
*/
export type Filter<A extends Array<any>, Criteria> =
  number extends A['length']
  // array
  ? (A[0] extends Criteria
    ? A
    : (Criteria extends A[0] ? Array<Criteria> : never[])
  )
  // tuple
  : (A['length'] extends 0
    ? never
    : (A extends [infer Head, ...infer Tail]
      ? (Tail['length'] extends 0
        ? (Head extends Criteria ? [Head] : never[])
        : (Head extends Criteria
          ? [Head, ...Filter<Tail, Criteria>]
          : Filter<Tail, Criteria>))
      : never))

/**
* keeps entries satisfying `Criteria` in array or tuple `A`.
*/
export type KeepMatch<A extends Array<any>, Criteria> = Filter<A, Criteria>

export type FindFirst<A extends Array<any>, Criteria> = (
  number extends A['length']
  ? A[0] extends Criteria ? A[0] : never
  : (A['length'] extends 0
    ? never
    : (A extends [any, ...infer Tail]
      ? A[0] extends Criteria ? A[0] : FindFirst<Tail, Criteria>
      : never)))

/**
 * @deprecated use FindFirst
 */
export type First<A extends any[], Criteria> = FindFirst<A, Criteria>

export type FindLast<A extends Array<any>, Criteria> =
  number extends A['length']
  ? A[0] extends Criteria ? A[0] : never
  : (A['length'] extends 0
    ? never
    : (A extends [...infer Heads, infer Last]
      ? Last extends Criteria ? Last : FindLast<Heads, Criteria>
      : never))

export type Head<T extends any[]> = T['length'] extends 0 ? never : T[0]


/**
 * Gets the intersect of properties of the elements in `A`
 */
export type IntersectOfProps<
  A extends Record<any, unknown>[],
  P extends KeyTypes
  > = A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? A[0][P]
    : A[0][P] & IntersectOfProps<Tail<A>, P>)

/**
 * Gets the intersect of properties of the elements in `A`
 * This will be deprecated in 4.0. Please use IntersectOfProps instead.
 */
export type MapToProp<A extends Record<any, any>[], P extends KeyTypes> = IntersectOfProps<A, P>

export type IsArray<T, Then = true, Else = false> = T extends any[] ? Then : Else

/**
 * Get the last type of an array or tuple.
 */
export type Last<T extends any[]> = T extends [...any[], infer R] ? R : T[0]


export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
  return entries
}


export type PadLeft<A extends any[], Total extends number, PadWith = any> =
  number extends A['length']
  ? (IsAny<UnionOfValues<A>> extends true
    ? A
    : (Equal<UnionOfValues<A>, PadWith> extends true
      ? A
      : PadLeft<[...CreateTuple<Total, PadWith>, ...A], Total, PadWith>))
  : (CreateTuple<Total, any> extends [...infer U, ...A]
    ? (number extends U['length']
      ? A
      : [...CreateTuple<U['length'], PadWith>, ...A])
    : A)

export function reduceWhile<T, R>(
  predicate: (acc: R, currentValue: T) => boolean,
  callbackfn: (previousValue: R, currentValue: T, currentIndex: number, array: T[]) => R,
  initialValue: R,
  array: T[]
) {
  let acc = initialValue
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    if (!predicate(acc, value)) return acc
    acc = callbackfn(acc, value, i, array)
  }
  return acc
}

export type Reverse<A extends unknown[]> =
  number extends A['length']
  ? A
  : (A['length'] extends 0
    ? A
    : (A['length'] extends 1
      ? A
      : (A extends [any, ...infer T] ? T extends any[]
        ? [...Reverse<T>, A[0]]
        : never : never)))

export type Some<
  A extends any[],
  Criteria,
  Mode extends 'strict' | 'loose' = 'loose',
  Then = true,
  Else = false
  > =
  Mode extends 'strict' ? Some.Strict<A, Criteria, Then, Else> :
  number extends A['length'] ? UnionOfValues<A> extends Criteria ? Then : Else :
  A['length'] extends 0 ? Else :
  A[0] extends Criteria ? Then : Some<Tail<A>, Criteria, 'loose', Then, Else>

export namespace Some {
  export type Strict<A extends any[], Criteria, Then, Else> =
    number extends A['length']
    ? (Equal<UnionOfValues<A>, Criteria> extends true ? Then : Else)
    : (A['length'] extends 0
      ? Else
      : (Equal<A[0], Criteria> extends true
        ? Then
        : Strict<Tail<A>, Criteria, Then, Else>))
}

/**
 * Gets the types of a tuple except the first entry.
 */
export type Tail<T extends any[]> = T['length'] extends 0
  ? never
  : (T extends [any, ...infer Tail]
    ? (Tail extends UnionOfValues<T>[] ? Tail : never)
    : T)

/**
 * Gets the union of properties of the elements in `A`
 */
export type UnionOfProps<A extends Record<any, any>[], P extends KeyTypes> =
  A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? A[0][P]
    : A[0][P] | UnionOfProps<Tail<A>, P>)

/**
 * Gets the union of properties in the element of `A`
 * This will be deprecated in 4.0. Please use UnionOfProps instead.
 */
export type PropUnion<A extends Record<any, any>[], P extends KeyTypes> = UnionOfProps<A, P>
/**
 * Gets the union of value types in `A`
 */
export type UnionOfValues<A extends Array<any>> = A extends Array<infer E> ? E : never

/**
 * Gets the union of value types in `A`
 * This will be deprecated in 4.0. Please use UnionOfValues instead.
 */
export type ArrayValue<A extends any[]> = UnionOfValues<A>
