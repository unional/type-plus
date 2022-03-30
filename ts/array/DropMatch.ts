import { Equal } from '../predicates'

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
  // : (undefined extends Criteria
  //   ? (Head extends undefined
  //     ? DropAll<Tail, Criteria>
  //     : [NonNullable<Head>, ...DropAll<Tail, Criteria>])
  //   : []
  // ))
  // : (Head extends Criteria
  //   ? (undefined extends Criteria
  //     ? [1, 2, 3]// [NonNullable<Head>, ...Filter<Tail, Criteria>]
  //     : [2, 3]// [Head, ...Filter<Tail, Criteria>]
  //   )
  //   : [2]//Filter<Tail, Criteria>
  // ))
  // : 2[]))
