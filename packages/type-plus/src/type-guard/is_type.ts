import type { IsEqual } from '../equal/is_equal.js'

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

/**
 * @deprecated use `isType<T>()` or `testType.true<T>()` instead
 */
isType.t = <T extends true>(subject?: T) => subject === undefined || subject === true

/**
 * @deprecated use `isType<T>()` or `testType.false<T>()` instead
 */
isType.f = <T extends false>(subject?: T) => subject === undefined || subject === false

/**
 * Check is the type `never`
 * @deprecated use `isType<T>()` or `testType.never<T>()` instead
 */
function isNever<_S extends never>(): unknown
/**
 * Check is the value is type `never`
 * @deprecated use `isType<T>()` or `testType.never<T>()` instead
 */
function isNever(subject: never): subject is never
function isNever(_subject?: unknown): _subject is never {
	return true
}

isType.never = isNever

/**
 * Are types A and B equals/not equals.
 * Easier to use than `isType.t<>()` and `isType.f<>()`,
 * when doing type level only equality comparison as you don't have to import `Equal<>`.
 *
 * @deprecated use `testType.equal()` instead
 */
isType.equal = <_C extends IsEqual<A, B>, A, B>() => {}
