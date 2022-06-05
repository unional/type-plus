import { AnyConstructor, isConstructor } from '../class/index.js'
import type { Equal } from './Equal.js'

export function isType<T>(subject: T): subject is T
export function isType<T>(subject: unknown, validator: (s: T) => boolean): subject is T
export function isType<T extends AnyConstructor>(subject: unknown, constructor: T): subject is InstanceType<T>
export function isType(subject: unknown, validator?: AnyConstructor | ((s: unknown) => boolean)) {
  if (validator) {
    if (isConstructor(validator))
      return subject instanceof validator
    else
      return validator(subject)
  }
  return true
}

isType.t = function <T extends true>(subject?: T) {
  return subject === undefined || subject === true
}
isType.f = function <T extends false>(subject?: T) {
  return subject === undefined || subject === false
}

/**
 * are types A and B equals/not equals.
 * Slightly easier to use then `isType.t<>()` and `isType.f<>()`,
 * when doing type level only equality comparison as you don't have to import `Equal<>`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
isType.equal = function <C extends Equal<A, B>, A, B>() { }
