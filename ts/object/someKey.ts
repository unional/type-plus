import type { KeyTypes } from './KeyTypes.js'

export function someKey<S extends Record<KeyTypes, any>, T = any>(
  subject: S,
  predicate: (this: T, key: keyof S, index: number, array: string[]) => unknown,
  thisArg?: T
): boolean {
  return Object.keys(subject).some(predicate, thisArg)
}
