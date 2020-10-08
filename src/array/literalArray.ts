import { KeyTypes } from '../record'

export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
  return entries
}
