import type { KeyTypes } from './KeyTypes.js'

export function reduceByKey<S extends Record<KeyTypes, any>, T>(
	subject: S,
	callbackfn: (previousValue: T, key: keyof S, currentIndex: number, array: string[], subject: S) => T,
	initialValue: T,
): T {
	return Object.keys(subject).reduce((p, k, i, a) => callbackfn(p, k, i, a, subject), initialValue)
}

/**
 * @deprecated renamed to reduceByKey
 */
export const reduceKey = reduceByKey
