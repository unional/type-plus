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
