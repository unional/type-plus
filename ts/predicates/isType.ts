import type { IsEqual } from '../equal/equal.js'

/**
 * Is the subject of type T
 */
export function isType<T>(subject: T): subject is T
/**
 * Is the subject of type T, satisfying the supplied validator
 */
export function isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T
export function isType(subject: unknown, validator?: (s: unknown) => unknown) {
	return validator ? !!validator(subject) : true
}

isType.t = function <T extends true>(subject?: T) {
	return subject === undefined || subject === true
}

isType.f = function <T extends false>(subject?: T) {
	return subject === undefined || subject === false
}

/**
 * Check is the type `never`
 */
function isNever<S extends never>(): unknown
/**
 * Check is the value is type `never`
 */
function isNever(subject: never): subject is never
function isNever(subject?: unknown): subject is never {
	return true
}

isType.never = isNever

/**
 * Are types A and B equals/not equals.
 * Easier to use than `isType.t<>()` and `isType.f<>()`,
 * when doing type level only equality comparison as you don't have to import `Equal<>`.
 *
 * @deprecated use `type.equal()` instead
 */
isType.equal = function <C extends IsEqual<A, B>, A, B>() {}
