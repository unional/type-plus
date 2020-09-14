import { KeyTypes } from './KeyTypes'

export function everyKey<T extends Record<KeyTypes, any>>(
  subject: T,
  predicate: (key: keyof T, index: number, array: string[]) => unknown,
  thisArg?: any
): boolean {
  return Object.keys(subject).every(predicate, thisArg)
}
