import type { IsAny } from '../any/any_type.js'
import type { IsArray } from '../array/array_type.js'
import type { IsBigint } from '../bigint/bigint_type.js'
import type { IsStrictBigint } from '../bigint/strict_bigint_type.js'
import type { IsBoolean } from '../boolean/boolean_type.js'
import type { IsFalse } from '../boolean/false_type.js'
import type { IsStrictBoolean } from '../boolean/strict_boolean_type.js'
import type { IsTrue } from '../boolean/true_type.js'
import type { IsEqual } from '../equal/equal.js'
import type { IsFunction } from '../function/function_type.js'
import type { IsStrictFunction } from '../function/strict_function_type.js'
import type { IsNever } from '../never/never_type.js'
import type { IsNull } from '../null/null_type.js'
import type { IsNumber } from '../number/number_type.js'
import type { IsStrictNumber } from '../number/strict_number_type.js'
import type { IsObject } from '../object/object_type.js'
import type { CanAssign, StrictCanAssign } from '../predicates/CanAssign.js'
import type { IsStrictString } from '../string/strict_string_type.js'
import type { IsString } from '../string/string_type.js'
import type { IsSymbol } from '../symbol/symbol_type.js'
import type { IsTuple } from '../tuple/tuple_type.js'
import type { IsUndefined } from '../undefined/undefined_type.js'
import type { IsUnknown } from '../unknown/unknown_type.js'
import type { IsVoid } from '../void/void_type.js'

interface TestType {
	/**
	 * Check if type `A` is equal to type `B` and `C`.
	 *
	 * @return `expected` as `A` for type inspection.
	 */
	equal<A, B, C>(expected: IsEqual<A, B> & IsEqual<A, C>): A
	/**
	 * Check if type `A` is equal to type `B`.
	 *
	 * @return `expected` as `A` for type inspection.
	 */
	equal<A, B>(expected: IsEqual<A, B>): A
	/**
	 * Check if `A` can assign to `B`.
	 *
	 * If `A` is a union,
	 * the check is distributive.
	 *
	 * Meaning the result can be `boolean`,
	 * meaning both `true` and `false` will pass.
	 *
	 * If you want to avoid the distributivity,
	 * use `testType.strictCanAssign()` instead.
	 *
	 * @example
	 * ```ts
	 * testType.canAssign<123, number> // true
	 *
	 * testType.canAssign<number | string, number> // boolean
	 * ```
	 *
	 * @return `expected` as `A` for type inspection.
	 */
	canAssign<A, B>(expected: CanAssign<A, B>): A
	/**
	 * Check if `A` can fully assign to `B`.
	 *
	 * This checks all branches in an union `A` are assignable to `B`.
	 *
	 * @example
	 * ```ts
	 * testType.strictCanAssign<number | string, number | string> // true
	 *
	 * testType.strictCanAssign<number | string, number> // false
	 * ```
	 *
	 * @return `expected` as `A` for type inspection.
	 */
	strictCanAssign<A, B>(expected: StrictCanAssign<A, B>): A
	/**
	 * Check if type `T` is exactly `any`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	any<T>(expected: IsAny<T>): T
	/**
	 * Check if type `T` is exactly `array`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	array<T>(expected: IsArray<T>): T
	/**
	 * Check if type `T` is exactly `bigint`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictBigint<T>(expected: IsStrictBigint<T>): T
	/**
	 * Check if type `T` is `bigint` or bigint literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	bigint<T>(expected: IsBigint<T>): T
	/**
	 * Check if type `T` is exactly `boolean`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictBoolean<T>(expected: IsStrictBoolean<T>): T
	/**
	 * Check if type `T` is `boolean` and boolean literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	boolean<T>(expected: IsBoolean<T>): T
	/**
	 * Check if type `T` is exactly `true`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	true<T>(expected: IsTrue<T>): T
	/**
	 * Check if type `T` is exactly `false`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	false<T>(expected: IsFalse<T>): T
	/**
	 * Check if type `T` is exactly `boolean`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictFunction<T>(expected: IsStrictFunction<T>): T
	/**
	 * Check if type `T` is `boolean` and boolean literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	function<T>(expected: IsFunction<T>): T
	/**
	 * Check if type `T` is exactly `never`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	never<T>(expected: IsNever<T>): T
	/**
	 * Check if type `T` is exactly `null`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	null<T>(expected: IsNull<T>): T
	/**
	 * Check if type `T` is exactly `number`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictNumber<T>(expected: IsStrictNumber<T>): T
	/**
	 * Check if type `T` is `number` or number literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	number<T>(expected: IsNumber<T>): T
	/**
	 * Check if type `T` is `object`.
	 *
	 * Note that `Function`, `Array`, and *tuple* are also `object`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	object<T>(expected: IsObject<T>): T
	/**
	 * Check if type `T` is exactly `string`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	strictString<T>(expected: IsStrictString<T>): T
	/**
	 * Check if type `T` is `string` or string literals.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	string<T>(expected: IsString<T>): T
	/**
	 * Check if type `T` is a `symbol`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	symbol<T>(expected: IsSymbol<T>): T
	/**
	 * Check if type `T` is a *tuple*.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	tuple<T>(expected: IsTuple<T>): T
	/**
	 * Check if type `T` is exactly `undefined`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	undefined<T>(expected: IsUndefined<T>): T
	/**
	 * Check if type `T` is exactly `unknown`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	unknown<T>(expected: IsUnknown<T>): T
	/**
	 * Check if type `T` is exactly `void`.
	 *
	 * @return `expected` as `T` for type inspection.
	 */
	void<T>(expected: IsVoid<T>): T
}

/**
 * Test utilities for types.
 *
 * This is designed specifically for testing.
 * The return value is the input `expected` parameter asserted as the first type parameter,
 * so that the type can be further inspected.
 */
export const testType = new Proxy({} as TestType, {
	get(_target, _prop, _receiver) {
		return (expected: unknown) => expected
	}
})
