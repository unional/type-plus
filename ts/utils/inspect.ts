/**
 * Inspects the value and returns it.
 */
export function inspect<T>(value: T, inspector: (value: Readonly<T>) => void): T {
  inspector(value)
  return value
}
