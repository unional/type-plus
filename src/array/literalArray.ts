import { KeyTypes } from '../object'

export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
  return entries
}
