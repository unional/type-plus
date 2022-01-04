export type Filter<A extends Array<any>, Criteria> =
  number extends A['length']
  ? (A[0] extends Criteria ? A : never[])
  : (A['length'] extends 0
    ? never
    : (A extends [infer Head, ...infer Tail]
      ? (Tail['length'] extends 0
        ? (Head extends Criteria ? [Head] : never[])
        : (Head extends Criteria
          ? [Head, ...Filter<Tail, Criteria>]
          : Filter<Tail, Criteria>))
      : never))
