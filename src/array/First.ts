export type First<
  A extends Array<any>,
  Criteria> = A['length'] extends 0 ? never :
  A extends [infer X, ...infer Tail] ?
  X extends Criteria ? X :
  First<Tail, Criteria> : A
