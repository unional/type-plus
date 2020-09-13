/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
export function assertType<T>(_subject: T): void { return }
// this does not work at the moment (TypeScript 3.7.3)
// export function assertType<T, U extends T = T>(subject: U): asserts subject is T { return }

assertType.isUndefined = function (value: undefined): asserts value is undefined {
  if (typeof value !== 'undefined') throw TypeError(`value is not undefined`)
}
assertType.noUndefined = noop as <T>(value: Exclude<T, undefined>) => void

assertType.isNull = function (value: null): asserts value is null {
  if (value !== null) throw TypeError('value is not null')
}
assertType.noNull = noop as <T>(value: Exclude<T, null>) => void

assertType.isNumber = function (value: number): asserts value is number {
  if (typeof value !== 'number') throw TypeError('value is not a number')
}
assertType.noNumber = noop as <T>(value: Exclude<T, number>) => void

assertType.isBoolean = function (value: boolean): asserts value is boolean {
  if (typeof value !== 'boolean') throw TypeError('value is not a boolean')
}
assertType.noBoolean = noop as <T>(value: Exclude<T, boolean>) => void

assertType.isTrue = function (value: true): asserts value is true {
  if (value !== true) throw TypeError('value is not true')
}
assertType.isFalse = function (value: false): asserts value is false {
  if (value !== false) throw TypeError(`value is not false`)
}

assertType.isString = function (value: string): asserts value is string {
  if (typeof value !== 'string') throw TypeError(`value is not string`)
}
assertType.noString = noop as <T>(value: Exclude<T, string>) => void

/**
 * Ensure the specific value type is `never`.
 * This is a type-only assertion.
 */
assertType.isNever = noop as (value: never) => void

assertType.isError = function <E extends Error>(value: E): asserts value is E {
  if (value instanceof Error) return
  throw TypeError(`value is not instance of Error`)
}

assertType.notAny = noop as (value: never) => void

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
