import type { MathDevice } from './math_device.js'

export type NumericToMathDevice<N extends number | bigint, Fail = never> = [N] extends [bigint]
	? BigintToMathDevice<N, Fail>
	: [N] extends [number]
	? NumberToMathDevice<N, Fail>
	: never

export type BigintToMathDevice<N extends bigint, Fail = never> = StringToMathDevice<`${N}n`>
export type NumberToMathDevice<N extends number, Fail = never> = StringToMathDevice<`${N}`>

export type StringToMathDevice<S extends string, Fail = never> = S extends `-${infer R}n`
	? ['bigint', '-', MathDevice.StringToNumberPart<R>]
	: S extends `${infer R}n`
	? ['bigint', '+', MathDevice.StringToNumberPart<R>]
	: S extends `-${infer R}`
	? ['number', '-', ...MathDevice.StringToNumberParts<R>]
	: S extends `${infer R}`
	? ['number', '+', ...MathDevice.StringToNumberParts<R>]
	: Fail

export type MathDeviceToNumeric<M extends MathDevice, Fail = never> = MathDevice.ToBigint<
	M,
	MathDevice.ToNumber<M, Fail>
>
