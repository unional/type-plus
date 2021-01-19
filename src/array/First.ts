import { ArrayValue } from './ArrayValue'

export type First<
  A extends Array<any>,
  Criteria> =
  number extends A['length'] ?
  ArrayValue<A> extends Criteria ? ArrayValue<A> : never :
  A['length'] extends 0 ? never :
  A extends [infer X, ...infer Tail] ?
  X extends Criteria ? X :
  First<Tail, Criteria> : A
