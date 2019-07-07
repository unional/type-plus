/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
export function assertType<T>(subject: T): void { return }

assertType.isUndefined = (value: undefined) => { return }
assertType.noUndefined = <T>(value: Exclude<T, undefined>) => { return }
assertType.isNull = (value: null) => { return }
assertType.noNull = <T>(value: Exclude<T, null>) => { return }
assertType.isNumber = (value: number) => { return }
assertType.noNumber = <T>(value: Exclude<T, number>) => { return }
assertType.isBoolean = (value: boolean) => { return }
assertType.noBoolean = <T>(value: Exclude<T, boolean>) => { return }
assertType.isString = (value: string) => { return }
assertType.noString = <T>(value: Exclude<T, string>) => { return }
assertType.isNever = (value: never) => { return }

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
