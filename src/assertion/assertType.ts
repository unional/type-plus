
import { AnyFunction } from '../function'

/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertType<T>(subject: T): void { return }
// this does not work at the moment (TypeScript 3.7.3)
// export function assertType<T, U extends T = T>(subject: U): asserts subject is T { return }

assertType.isUndefined = function (value: undefined): asserts value is undefined {
  if (typeof value !== 'undefined') throw TypeError(`value is not undefined`)
}
assertType.noUndefined = function <S>(value: Exclude<S, undefined>): void {
  if (typeof value === 'undefined') throw TypeError(`value is undefined`)
}

assertType.isNull = function (value: null): asserts value is null {
  if (value !== null) throw TypeError(`value is not null`)
}
assertType.noNull = function <S>(value: Exclude<S, null>): void {
  if (value === null) throw TypeError(`value is null`)
}

assertType.isNumber = function (value: number): asserts value is number {
  if (typeof value !== 'number') throw TypeError(`value is not number`)
}
assertType.noNumber = function <S>(value: Exclude<S, number>): void {
  if (typeof value === 'number') throw TypeError(`value is number`)
}

assertType.isBoolean = function (value: boolean): asserts value is boolean {
  if (typeof value !== 'boolean') throw TypeError(`value is not boolean`)
}
assertType.noBoolean = function <S>(value: Exclude<S, boolean>): void {
  if (typeof value === 'boolean') throw TypeError(`value is boolean`)
}

assertType.isTrue = function (value: true): asserts value is true {
  if (value !== true) throw TypeError(`value is not true`)
}
assertType.noTrue = function <S>(value: Exclude<S, true>): void {
  // @ts-ignore
  if (value === true) throw TypeError(`value is true`)
}

assertType.isFalse = function (value: false): asserts value is false {
  if (value !== false) throw TypeError(`value is not false`)
}
assertType.noFalse = function <S>(value: Exclude<S, false>): void {
  // @ts-ignore
  if (value === false) throw TypeError(`value is false`)
}

assertType.isString = function (value: string): asserts value is string {
  if (typeof value !== 'string') throw TypeError(`value is not string`)
}
assertType.noString = function <S>(value: Exclude<S, string>): void {
  if (typeof value === 'string') throw TypeError(`value is string`)
}

assertType.isFunction = function (value: AnyFunction): asserts value is AnyFunction {
  if (typeof value !== 'function') throw TypeError(`value is not function`)
}
assertType.noFunction = function <S>(value: Exclude<S, AnyFunction>): void {
  if (typeof value === 'function') throw TypeError(`value is function`)
}

assertType.isError = function (value: Error): asserts value is Error {
  if (!(value instanceof Error)) throw TypeError(`value is not an Error`)
}
assertType.noError = function <S>(value: Exclude<S, Error>): void {
  if (value instanceof Error) throw TypeError(`value is an Error`)
}

/**
 * create a type assertion function for the specified type.
 * @type T the type to check against.
 */
export function typeAssertion<T>(): <R extends T>(subject: R) => R {
  return (subject) => subject as any
}
