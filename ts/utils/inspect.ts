/**
 * Inspects the value and returns it.
 */
export function inspect<T>(value: T, inspector: (value: T) => void): T {
  inspector(value)
  return value
}
