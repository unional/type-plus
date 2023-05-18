import type { IsBigint } from '../bigint/bigint_type.js'
import type { IsNumber } from '../number/number_type.js'

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
	N,
	[number] extends [N] ? Fail : `${N}` extends `-${infer P extends number}` ? P : N,
	IsBigint<N, [bigint] extends [N] ? Fail : `${N}` extends `-${infer P extends bigint}` ? P : N, Fail>
>
