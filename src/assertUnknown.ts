/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
export function assertUnknown<T>(value: unknown, handler?: (s: T) => boolean): asserts value is T {
  if (handler && !handler(value as any)) throw new TypeError(`fail to assert value through handler`)
  return
}
