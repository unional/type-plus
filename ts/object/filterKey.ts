import type { KeyTypes } from './KeyTypes.js'

export function filterKey<S extends Record<KeyTypes, any>, T = any>(
  subject: S,
  predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>, subject: S) => boolean,
  thisArg?: T): Array<keyof S> {
  return Object.keys(subject).filter(function (this: T, k, i, a) {
    return predicate.apply(this, [k, i, a, subject])
  }, thisArg)
}
