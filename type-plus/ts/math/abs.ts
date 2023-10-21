import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/*
 * Returns the absolute value of a number or bigint `N`.
 *
 * @example
 * ```ts
 * Abs<-5> // 5
 * Abs<5> // 5
 * Abs<-1n> // 1n  // Where `1n` is a bigint
 * ```
 */
export type Abs<N extends number | bigint, Fail = never> = IsNumber<
	N, IsNumber.$Branch
> extends infer R
	? R extends $Then ? [number] extends [N] ? Fail : `${N}` extends `-${infer P extends number}` ? P : N
	: R extends $Else ? IsBigint<N> extends infer R
	? R extends true ? [bigint] extends [N] ? Fail : `${N}` extends `-${infer P extends bigint}` ? P : N
	: Fail
	: never
	: never : never
