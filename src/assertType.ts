import { KeyTypes } from './KeyTypes'
import { UnionKeys } from './UnionKeys'

/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
export function assertType<T>(_subject: T): void { return }

assertType.isUndefined = noop as (value: undefined) => void
assertType.noUndefined = noop as <T>(value: Exclude<T, undefined>) => void
assertType.isNull = noop as (value: null) => void
assertType.noNull = noop as <T>(value: Exclude<T, null>) => void
assertType.isNumber = noop as (value: number) => void
assertType.noNumber = noop as <T>(value: Exclude<T, number>) => void
assertType.isBoolean = noop as (value: boolean) => void
assertType.noBoolean = noop as <T>(value: Exclude<T, boolean>) => void
assertType.isTrue = noop as (value: true) => void
assertType.isFalse = noop as (value: false) => void
assertType.isString = noop as (value: string) => void
assertType.noString = noop as <T>(value: Exclude<T, string>) => void
assertType.isNever = noop as (value: never) => void

// eslint-disable-next-line @typescript-eslint/no-unused-vars
assertType.hasProperty = function hasProperty<T, P extends UnionKeys<T>>(value: T, prop: P): asserts value is T & Record<P, T[P]> { }

// assertType.hasProperty = <T>(value: T, propertyName: KeyTypes)
function noop() { return }

/**
 * create a type assertion function for the specified type.
 * @type T the type to check against.
 */
export function typeAssertion<T>(): <R extends T>(subject: R) => R {
  return (subject) => subject as any
}

/**
 * @deprecated renamed to `assertType`.
 */
export const typeAssert = assertType
