import { KeyTypes } from './KeyTypes'

export function filterKey<S extends Record<KeyTypes, any>, T = any>(
  subject: S,
  predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>) => boolean,
  thisArg?: T): Array<keyof S> {
  return Object.keys(subject).filter(predicate, thisArg)
}
