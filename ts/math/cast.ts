import type { MathDevice } from './math_device.js'

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
