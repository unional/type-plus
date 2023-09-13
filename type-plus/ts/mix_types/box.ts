import type { IsBigint } from '../bigint/bigint_type.js'
import type { IsBoolean } from '../boolean/boolean_type.js'
import type { IsFunction } from '../function/function_type.js'
import type { IsNumber } from '../number/number_type.js'
import type { IsStrictObject } from '../object/is_strict_object.js'
import type { IsString } from '../string/string_type.js'
import type { IsSymbol } from '../symbol/symbol_type.js'

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
		Function,
		IsStrictObject<
			T,
			Object,
			T extends Record<any, any> ? T :
			IsBoolean<
				T,
				Boolean,
				IsNumber<
					T,
					Number,
					IsString<
						T,
						String,
						IsSymbol<
							T,
							Symbol,
							IsBigint<T, BigInt, Options['$notBoxable']>
						>
					>
				>
			>
		>
	>

export namespace Box {
	export type Options = {
		$notBoxable?: unknown
	}
	export interface DefaultOptions {
		$notBoxable: never
	}
}
