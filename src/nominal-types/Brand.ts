// By Drew Colthorp, <https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/#comment-604580>
// <https://gist.github.com/dcolthorp/aa21cf87d847ae9942106435bf47565d>

import { AnyRecord } from '../any-types'
import { typeSym } from '../utils'

/**
 * Create a "branded" version of a type.
 * TypeScript won't allow implicit conversion to this type
 */
export type Brand<BrandT extends string, T extends AnyRecord> = T & { [typeSym]: BrandT }

export function brand<B extends string, T extends AnyRecord>(type: B, subject: T = {} as any): Brand<B, T> {
  (subject as any)[typeSym] = type
  return subject as any
}

export function createBrandCreator<BrandT extends string, T>(): (value: T) => Brand<BrandT, T> {
  return (value: T): Brand<BrandT, T> => {
    return value as any
  }
}
