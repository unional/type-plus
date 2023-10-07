import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsBoolean } from '../boolean/is_boolean.js'
import type { IsFunction } from '../function/is_function.js'
import type { IsNumber } from '../number/is_number.js'
import type { IsStrictObject } from '../object/is_strict_object.js'
import type { IsString } from '../string/is_string.js'
import type { IsSymbol } from '../symbol/is_symbol.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Converts primitive types to their boxed types.
 *
 * @typeParam Options['$notBoxable'] return type when `T` is not boxable. Defaults to `never`.
 *
 * @example
 * ```ts
 * Box<number> // Number
 * Box<object> // Object
 * Box<string>  // String
 * Box<'abc'>  // String
 *
 * Box<undefined> // never
 * ```
 */
export type Box<T, Options extends Box.Options = Box.DefaultOptions> =
	IsFunction<
		T,
		IsFunction.$Branch
	> extends infer R
	? R extends $Then ? Function
	: IsStrictObject<
		T,
		IsStrictObject.$Branch> extends infer R
	? R extends $Then ? Object :
	T extends Record<any, any> ? T :
	IsBoolean<
		T,
		$SelectionBranch
	> extends infer R
	? R extends $Then ? Boolean
	: R extends $Else ? IsNumber<
		T,
		IsNumber.$Branch
	> extends infer R
	? R extends $Then ? Number
	: R extends $Else ? IsString<
		T,
		{
			$then: String,
			$else: IsSymbol<
				T,
				Symbol,
				IsBigint<T, { $then: BigInt, $else: Options['$notBoxable'] }>
			>
		}
	>
	: never : never
	: never : never
	: never
	: never

export namespace Box {
	export type Options = {
		$notBoxable?: unknown
	}
	export interface DefaultOptions {
		$notBoxable: never
	}
}
