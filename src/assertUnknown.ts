/**
 * assert the subject satisfies the specified type T
 * @type T the type to check against.
 */
export function assertUnknown<T>(value: unknown, handler?: (s: T) => boolean): asserts value is T {
  if (handler && !handler(value as any)) throw new TypeError(`fail to assert value through handler`)
  return
}

/**
 * Ensure the specific value type is `never`.
 * This is a type-only assertion.
 */
assertUnknown.isNever = noop as (value: never) => void

assertUnknown.isError = function <E extends Error>(value: unknown): asserts value is E {
  if (value instanceof Error) return
  throw TypeError(`value is not instance of Error`)
}

function noop() { return }
