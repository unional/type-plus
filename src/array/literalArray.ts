import { KeyTypes } from '../object-key/KeyTypes'

export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
  return entries
}
