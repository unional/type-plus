import { tersify } from 'tersify'
import { AnyConstructor, isConstructor } from '../class'
import { AnyFunction } from '../function'

/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
export function assertType<T>(subject: T): asserts subject is T
export function assertType<T>(subject: unknown, validator: (s: T) => boolean): asserts subject is T
export function assertType<T extends new (...args: any) => any>(subject: unknown, constructor: T): asserts subject is InstanceType<T>
export function assertType(subject: unknown, validator?: (s: any) => boolean) {
  if (validator) {
    if ((isConstructor(validator) && !(subject instanceof validator)) || !validator(subject))
      throw new TypeError(`subject fails to satisfy ${tersify(validator)}`)
  }
  return
}

assertType.isUndefined = function (subject: undefined): asserts subject is undefined {
  if (typeof subject !== 'undefined') throw TypeError(`subject is not undefined`)
}
assertType.noUndefined = function <S>(subject: Exclude<S, undefined>): void {
  if (typeof subject === 'undefined') throw TypeError(`subject is undefined`)
}

assertType.isNull = function (subject: null): asserts subject is null {
  if (subject !== null) throw TypeError(`subject is not null`)
}
assertType.noNull = function <S>(subject: Exclude<S, null>): void {
  if (subject === null) throw TypeError(`subject is null`)
}

assertType.isNumber = function (subject: number): asserts subject is number {
  if (typeof subject !== 'number') throw TypeError(`subject is not number`)
}
assertType.noNumber = function <S>(subject: Exclude<S, number>): void {
  if (typeof subject === 'number') throw TypeError(`subject is number`)
}

assertType.isBoolean = function (subject: boolean): asserts subject is boolean {
  if (typeof subject !== 'boolean') throw TypeError(`subject is not boolean`)
}
assertType.noBoolean = function <S>(subject: Exclude<S, boolean>): void {
  if (typeof subject === 'boolean') throw TypeError(`subject is boolean`)
}

assertType.isTrue = function (subject: true): asserts subject is true {
  if (subject !== true) throw TypeError(`subject is not true`)
}
assertType.noTrue = function <S>(subject: Exclude<S, true>): void {
  // @ts-ignore
  if (subject === true) throw TypeError(`subject is true`)
}

assertType.isFalse = function (subject: false): asserts subject is false {
  if (subject !== false) throw TypeError(`subject is not false`)
}
assertType.noFalse = function <S>(subject: Exclude<S, false>): void {
  // @ts-ignore
  if (subject === false) throw TypeError(`subject is false`)
}

assertType.isString = function (subject: string): asserts subject is string {
  if (typeof subject !== 'string') throw TypeError(`subject is not string`)
}
assertType.noString = function <S>(subject: Exclude<S, string>): void {
  if (typeof subject === 'string') throw TypeError(`subject is string`)
}

assertType.isFunction = function (subject: AnyFunction): asserts subject is AnyFunction {
  if (typeof subject !== 'function') throw TypeError(`subject is not function`)
}
assertType.noFunction = function <S>(subject: Exclude<S, AnyFunction>): void {
  if (typeof subject === 'function') throw TypeError(`subject is function`)
}

assertType.isConstructor = function (subject: AnyConstructor): asserts subject is AnyConstructor {
  if (!isConstructor(subject)) throw TypeError(`subject is not a constructor`)
}

assertType.isError = function (subject: Error): asserts subject is Error {
  if (!(subject instanceof Error)) throw TypeError(`subject is not an Error`)
}
assertType.noError = function <S>(subject: Exclude<S, Error>): void {
  if (subject instanceof Error) throw TypeError(`subject is an Error`)
}

assertType.isNever = function (subject: never): asserts subject is never {
}

/**
 * creates a custom assertion function with standard TypeError.
 * Currently this requires explicity type annotation,
 * thus making it hard to use:
 * https://github.com/microsoft/TypeScript/issues/41047
 */
assertType.custom = function <T>(
  validator: (s: T) => boolean
): (subject: unknown) => asserts subject is T {
  return function (subject) {
    if (!validator(subject as any)) throw new TypeError(`subject fails to satisfy ${tersify(validator)}`)
    return
  }
}
