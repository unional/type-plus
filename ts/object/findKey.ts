import { KeyTypes } from './KeyTypes.js'

export function findKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>, subject: S) => boolean,
	thisArg?: T
): keyof S | undefined {
	return Object.keys(subject).find(function (this: T, k, i, a) {
		return predicate.apply(this, [k, i, a, subject])
	}, thisArg)
}
