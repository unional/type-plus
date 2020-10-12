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
export type Flavor<FlavorT extends string, T> = T & {
  /**
   * @internal
   */
  [typeSym]?: FlavorT
}

/**
 * Creates a brand creator with the specified type.
 */
export function flavor<B extends string>(type: B): <T>(subject: T) => Flavor<B, Widen<T>>
/**
 * Creates a branded value of specified type.
 */
export function flavor<B extends string, T>(type: B, subject: T): Flavor<B, Widen<T>>
export function flavor(type: string, subject?: any) {
  if (subject === undefined) {
    return function (subject: any) { return flavor(type, subject) }
  }
  if (typeof subject === 'object' && subject !== null) {
    // if subject is not an object, the branding will exist only in type-level.
    (subject as any)[typeSym] = type
  }
  return subject
}
