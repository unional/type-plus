import { KeyTypes } from './KeyTypes.js'

export function everyKey<S extends Record<KeyTypes, any>, T = any>(
  subject: S,
  predicate: (this: T, key: keyof S, index: number, array: string[]) => unknown,
  thisArg?: T
): boolean {
  return Object.keys(subject).every(predicate, thisArg)
}
