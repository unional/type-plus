/**
 * Intersect type recursively.
 * The recursion terminates at level 7 due to design limit of TypeScript.
 *
 * Normal use case is intersecting betwee two object types.
 * While it works for value types and top level array,
 * top level array does not recursive into the elements.
 */
export type RecursiveIntersect<T, U> = (T & (
  T extends Array<infer Y> ? Array<Y & U> & U :
  T extends object ? {
    [P in keyof T]:
    T[P] extends Array<infer R> ? Array<RecursiveIntersect<R, U>> & U :
    T[P] extends object ? RecursiveIntersect<T[P], U> :
    T[P] & U
  } & U : U)
)
