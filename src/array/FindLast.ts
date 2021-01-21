
export type FindLast<A extends Array<any>, Criteria> =
  number extends A['length']
  ? (A[0] extends Criteria ? A[0] : never)
  : (A['length'] extends 0
    ? never
    : (A extends [...infer Heads, infer Last]
      ? (Last extends Criteria ? Last : FindLast<Heads, Criteria>)
      : never
    )
  )
