import type { Brand } from './Brand.js'
import type { Flavor } from './Flavor.js'
import { typeSym } from './types.js'

export function nominalMatch<A extends string, B extends A>(
	a: Brand<A, unknown>,
	b: Brand<B, unknown>
): boolean
export function nominalMatch<A extends string, B extends A>(
	a: Flavor<A, unknown>,
	b: Flavor<B, unknown>
): boolean
export function nominalMatch<A extends string, B extends A>(
	a: Brand<A, unknown> | Flavor<A, unknown>,
	b: Brand<B, unknown> | Flavor<B, unknown>
) {
	if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null)
		return a[typeSym] === b[typeSym]
	else {
		return true
	}
}
