import type { IsStrictBoolean, IsFalse, IsTrue } from '../boolean/boolean_type.js'
import type { IsEqual } from '../equal/equal.js'
import { IsAny } from '../index.js'
import type { IsNever } from '../never/never_type.js'
import type { IsNumber } from '../number/number_type.js'
import type { CanAssign } from '../predicates/CanAssign.js'

/**
 * Check if type `A` is equal to type `B` and `C`.
 *
 * @return value as `A` for type inspection.
 */
function equal<A, B, C>(expected: IsEqual<A, B> & IsEqual<A, C>): A
/**
 * Check if type `A` is equal to type `B`.
 *
 * @return value as `A` for type inspection.
 */
function equal<A, B>(expected: IsEqual<A, B>): A
function equal(expected: any) {
	return expected
}

export const type = {
	/**
	 * Check if type `T` is exactly `any`.
	 *
	 * @return value as `T` for type inspection.
	 */
	any<T>(expected: IsAny<T>): T {
		return expected as any
	},
	equal,
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
	boolean<S>(expected: IsStrictBoolean<S>): S {
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
