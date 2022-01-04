// By Drew Colthorp, <https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/#comment-604580>
// <https://gist.github.com/dcolthorp/aa21cf87d847ae9942106435bf47565d>

import { Widen } from '../utils'
import { typeSym } from './types'

/**
 * Create a "flavored" version of a type.
 * TypeScript will disallow mixing flavors,
 * but will allow unflavored values of that type to be passed in where a flavored version is expected.
 * This is a less restrictive form of branding.
 */
export type Flavor<F extends string, T> = T & {
  [typeSym]?: F
}

/**
 * Creates a brand creator with the specified type.
 */
export function flavor<F extends string>(type: F): <T>(subject: T) => Flavor<F, Widen<T>>
/**
 * Creates a branded value of specified type.
 */
export function flavor<F extends string, T>(type: F, subject: T): Flavor<F, Widen<T>>
export function flavor(type: string, subject?: unknown) {
  if (subject === undefined) return function <T>(subject: T) { return flavor(type, subject) }
  if (typeof subject === 'object' && subject !== null) {
    // if subject is not an object, the branding will exist only in type-level.
    (subject as { [typeSym]: string })[typeSym] = type
  }
  return subject
}
