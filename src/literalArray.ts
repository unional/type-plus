import { KeyTypes } from './KeyTypes';

export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
  return entries
}
