import type { IsBoolean, IsFalse, IsTrue } from '../boolean/boolean_type.js'
import type { IsEqual } from '../equal/equal.js'
import type { IsNever } from '../never/never.js'
import type { IsNumber } from '../number/number_type.js'
import type { CanAssign } from '../predicates/CanAssign.js'

export const type = {
	/**
	 * Check if type `S` (subject) is equal to type `E` (expected).
	 *
	 * @return value as `S` for type inspection.
	 */
	equal<S, E>(expected: IsEqual<S, E>): S {
		return expected as any
	},
	/**
	 * Check if `A` can assign to `B`.
	 *
	 * @return value as `A` for type inspection.
	 */
	canAssign<A, B>(expected: CanAssign<A, B>): A {
		return expected as any
	},
	/**
	 * Check if type `S` (subject) is exactly `true`.
	 *
	 * @return value as `S` for type inspection.
	 */
	true<S>(expected: IsTrue<S>): S {
		return expected as any
	},
	/**
	 * Check if type `S` (subject) is exactly `false`.
	 *
	 * @return value as `S` for type inspection.
	 */
	false<S>(expected: IsFalse<S>): S {
		return expected as any
	},
	/**
	 * Check if type `S` (subject) is exactly `boolean`.
	 *
	 * @return value as `S` for type inspection.
	 */
	boolean<S>(expected: IsBoolean<S>): S {
		return expected as any
	},
	/**
	 * Check if type `S` (subject) is exactly `never`.
	 *
	 * @return value as `S` for type inspection.
	 */
	never<S>(expected: IsNever<S>): S {
		return expected as any
	},
	/**
	 * Check if type `S` (subject) is exactly `number`.
	 *
	 * @return value as `S` for type inspection.
	 */
	number<S>(expected: IsNumber<S>): S {
		return expected as any
	}
}
