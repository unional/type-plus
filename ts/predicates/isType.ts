import type { Equal } from './Equal.js'

/**
 * Is the subject of type T
 */
export function isType<T>(subject: T): subject is T
/**
 * Is the subject of type T, satisfying the supplied validator
 */
export function isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T
export function isType(subject: unknown, validator?: (s: unknown) => unknown) {
  return validator ? !!validator(subject) : true
}

isType.t = function <T extends true>(subject?: T) {
  return subject === undefined || subject === true
}
isType.f = function <T extends false>(subject?: T) {
  return subject === undefined || subject === false
}

/**
 * Are types A and B equals/not equals.
 * Easier to use then `isType.t<>()` and `isType.f<>()`,
 * when doing type level only equality comparison as you don't have to import `Equal<>`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
isType.equal = function <C extends Equal<A, B>, A, B>() { }
