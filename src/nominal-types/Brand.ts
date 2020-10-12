// By Drew Colthorp, <https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/#comment-604580>
// <https://gist.github.com/dcolthorp/aa21cf87d847ae9942106435bf47565d>

import { AnyRecord } from '../object'
import { Widen } from '../utils'
import { typeSym } from './types'

/**
 * Create a "branded" version of a type.
 * TypeScript won't allow implicit conversion to this type
 */
export type Brand<B extends string, T> = T & {
  /**
   * @internal
   */
  [typeSym]: B
}

/**
 * Creates a brand creator with the specified type.
 */
export function brand<B extends string>(type: B): <T>(subject: T) => Brand<B, Widen<T>>
/**
 * Creates a branded value of specified type.
 */
export function brand<B extends string, T extends AnyRecord>(type: B, subject: T): Brand<B, Widen<T>>
export function brand(type: string, subject?: any) {
  if (subject === undefined) {
    return function (subject: any) { return brand(type, subject) }
  }
  else {
    (subject as any)[typeSym] = type
    return subject
  }
}
