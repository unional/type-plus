import type { KeyTypes } from '../object/index.js'

export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
	return entries
}
