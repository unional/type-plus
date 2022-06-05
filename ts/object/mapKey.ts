import { KeyTypes } from './KeyTypes.js'

export function mapKey<R, S extends Record<KeyTypes, any>, T = any>(
  subject: S,
  predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>) => R,
  thisArg?: T): R[] {
  return Object.keys(subject).map(predicate, thisArg)
}
