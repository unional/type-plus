// By Drew Colthorp, <https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/#comment-604580>
// <https://gist.github.com/dcolthorp/aa21cf87d847ae9942106435bf47565d>

import { Widen } from '../utils'
import { typeSym, valueSym } from './types'

/**
 * Create a "branded" version of a type.
 * TypeScript won't allow implicit conversion to this type
 */
export type Brand<B extends string, T> =
  T extends undefined | null | number | bigint | boolean
  ? { [typeSym]: B, [valueSym]: T }
  : T & { [typeSym]: B }

/**
 * Creates a brand creator with the specified type.
 */
export function brand<B extends string>(type: B): <T>(subject: T) => Brand<B, Widen<T>>
/**
 * Creates a branded value of specified type.
 */
export function brand<B extends string, T>(type: B, subject: T): Brand<B, Widen<T>>
export function brand(type: string, subject?: unknown) {
  if (subject === undefined) return function <T>(subject: T) { return brand(type, subject) }

  if (typeof subject === 'object' && subject !== null) {
    // if subject is not an object, the branding will exist only in type-level.
    (subject as { [typeSym]: string })[typeSym] = type
  }
  return subject
}
