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
	// hasUndefined<T>(expected: CanAssign<T, undefined>): T
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
	/**
	 * A quick way to inspect a type.
	 *
	 * The handler receives a `InspectedType` object.
	 * It contains `value` which is typed to `T`,
	 * and many other properties to inspect the behavior of `T`.
	 *
	 * The handler is not being call,
	 * it is use to hold the type in value for inspection.
	 *
	 * 🧪 *testing*
	 * 🦴 *utilities*
	 *
	 * @example
	 * ```ts
	 * testType.inspect<SomeType>(t => {
	 *   type T = typeof t.value // resolve and inspect the type `T`
	 *   t.extend_boolean // result of `T extends boolean`
	 * })
	 * ```
	 *
	 * After trying out the type, remove the line.
	 */
	inspect<T>(handler: (t: InspectedType<T>) => unknown): T
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

export type InspectedType<T> = {
	type: T
	extends<R>(): T extends R ? true : false
	extends_any: T extends any ? true : false
	extends_unknown: T extends unknown ? true : false
	extends_void: T extends void ? true : false
	extends_never: T extends never ? true : false
	extends_undefined: T extends undefined ? true : false
	extends_null: T extends null ? true : false
	extends_boolean: T extends boolean ? true : false
	extends_true: T extends true ? true : false
	extends_false: T extends false ? true : false
	extends_number: T extends number ? true : false
	extends_1: T extends 1 ? true : false
	extends_bigint: T extends bigint ? true : false
	extends_1n: T extends 1n ? true : false
	extends_string: T extends string ? true : false
	extends_a: T extends 'a' ? true : false
	extends_symbol: T extends symbol ? true : false
	extends_object: T extends object ? true : false
	extends_function: T extends Function ? true : false
	extends_array_unknown: T extends unknown[] ? true : false
	extends_tuple_empty: T extends [] ? true : false
	union<R>(): T | R
	union_any: T | any
	union_unknown: T | unknown
	union_void: T | void
	union_never: T | never
	union_undefined: T | undefined
	union_null: T | null
	union_boolean: T | boolean
	union_true: T | true
	union_false: T | false
	union_number: T | number
	union_1: T | 1
	union_bigint: T | bigint
	union_1n: T | 1n
	union_string: T | string
	union_a: T | 'a'
	union_symbol: T | symbol
	union_object: T | object
	union_function: T | Function
	union_array_unknown: T | unknown[]
	union_tuple_empty: T | []
	intersect<R>(): T & R
	intersect_any: T & any
	intersect_unknown: T & unknown
	intersect_void: T & void
	intersect_never: T & never
	intersect_undefined: T & undefined
	intersect_null: T & null
	intersect_boolean: T & boolean
	intersect_true: T & true
	intersect_false: T & false
	intersect_number: T & number
	intersect_1: T & 1
	intersect_bigint: T & bigint
	intersect_1n: T & 1n
	intersect_string: T & string
	intersect_a: T & 'a'
	intersect_symbol: T & symbol
	intersect_object: T & object
	intersect_function: T & Function
	intersect_array_unknown: T & unknown[]
	intersect_tuple_empty: T & []
}
