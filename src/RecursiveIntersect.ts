/**
 * Intersect type recursively.
 * The recursion terminates at level 7 due to design limit of TypeScript.
 */
export type RecursiveIntersect<T, U> = (T & (
  T extends Array<infer Y> ? Array<Y & U> & U :
  T extends object ? {
    [P in keyof T]:
    T[P] extends Array<infer R> ? RecursiveIntersect<R, U>[] :
    T[P] extends object ? RecursiveIntersect<T[P], U> :
    T[P] & U
  } & U : U)
)
