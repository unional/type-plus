import type { KeyTypes } from './KeyTypes.js'

export function forEachKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>) => void,
	thisArg?: T
): void {
	Object.keys(subject).forEach(predicate, thisArg)
}
