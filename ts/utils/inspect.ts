/* eslint-disable no-console */

/**
 * Inspects the value and returns it.
 */
export function inspect<T>(value: T, inspector: (value: Readonly<T>) => void = console.dir): T {
	inspector(value)
	return value
}
