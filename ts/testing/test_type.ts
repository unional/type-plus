import type { IsAny } from '../any/any_type.js'
import type { IsBigint } from '../bigint/bigint_type.js'
import type { IsStrictBigint } from '../bigint/strict_bigint_type.js'
import type { IsBoolean } from '../boolean/boolean_type.js'
import type { IsFalse } from '../boolean/false_type.js'
import type { IsStrictBoolean } from '../boolean/strict_boolean_type.js'
import type { IsTrue } from '../boolean/true_type.js'
import type { Equal } from '../equal/equal.js'
import type { IsNever } from '../never/never_type.js'
import type { IsNull } from '../null/null_type.js'
import type { IsNumber } from '../number/number_type.js'
import type { IsStrictNumber } from '../number/strict_number_type.js'
import type { CanAssign } from '../predicates/CanAssign.js'
import type { IsStrictString } from '../string/strict_string_type.js'
import type { IsString } from '../string/string_type.js'
import type { IsUndefined } from '../undefined/undefined_type.js'
import type { IsUnknown } from '../unknown/unknown_type.js'
import type { IsVoid } from '../void/void_type.js'

/**
 * Check if type `A` is equal to type `B` and `C`.
 *
 * @return `expected` as `A` for type inspection.
 */
function equal<A, B, C>(expected: Equal<A, B> & Equal<A, C>): A
/**
 * Check if type `A` is equal to type `B`.
 *
 * @return `expected` as `A` for type inspection.
 */
function equal<A, B>(expected: Equal<A, B>): A
function equal(expected: unknown) {
	return expected
}

/**
 * Test utilities for types.
 *
 * This is designed specifically for testing.
 * The return value is the input `expected` parameter asserted as the first type parameter,
 * so that the type can be further inspected.
 */
export const testType = {
	/**
	 * Check if type `T` is exactly `any`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	any<T>(expected: IsAny<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `unknown`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	unknown<T>(expected: IsUnknown<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `never`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	never<T>(expected: IsNever<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `void`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	void<T>(expected: IsVoid<T>) {
		return expected as T
	},
	equal,
	/**
	 * Check if `A` can assign to `B`.
	 *
	 * @return `expected` as `A` for type inspection.
	 */
	canAssign<A, B>(expected: CanAssign<A, B>) {
		return expected as A
	},
	/**
	 * Check if type `T` is exactly `boolean`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictBoolean<T>(expected: IsStrictBoolean<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is `boolean` and boolean literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	boolean<T>(expected: IsBoolean<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `true`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	true<T>(expected: IsTrue<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `false`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	false<T>(expected: IsFalse<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `number`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictNumber<T>(expected: IsStrictNumber<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is `number` or number literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	number<T>(expected: IsNumber<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `string`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictString<T>(expected: IsStrictString<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is `string` or string literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	string<T>(expected: IsString<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `bigint`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictBigint<T>(expected: IsStrictBigint<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is `bigint` or bigint literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	bigint<T>(expected: IsBigint<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `undefined`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	undefined<T>(expected: IsUndefined<T>) {
		return expected as T
	},
	/**
	 * Check if type `T` is exactly `null`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	null<T>(expected: IsNull<T>) {
		return expected as T
	}
}
