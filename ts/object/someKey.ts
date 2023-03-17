import type { KeyTypes } from './KeyTypes.js'

export function someKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, array: string[], subject: S) => unknown,
	thisArg?: T
): boolean {
	return Object.keys(subject).some(function (this: T, k, i, a) {
		return predicate.apply(this, [k, i, a, subject])
	}, thisArg)
}
