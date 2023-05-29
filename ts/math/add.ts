import { NumericStruct } from './numeric_struct2.js'

export type Add<A extends number | bigint, B extends number | bigint, Fail = never> = NumericStruct.ToNumeric<
	NumericStruct.Add<NumericStruct.FromNumeric<A>, NumericStruct.FromNumeric<B>>
>
//  [
// 	NumericStruct.FromNumeric<A>,
// 	NumericStruct.FromNumeric<B>
// ] extends [infer MA extends NumericStruct, infer MB extends NumericStruct]
// 	? [MA[1], MB[1]] extends ['+', '+']
// 		? NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '+', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
// 		  >
// 		: [MA[1], MB[1]] extends ['+', '-']
// 		? NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '+', DigitsStruct.SubtractNormalized<MA[2], MB[2], []>]>
// 		  >
// 		: [MA[1], MB[1]] extends ['-', '+']
// 		? NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '+', DigitsStruct.SubtractNormalized<MB[2], MA[2], []>]>
// 		  >
// 		: NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '-', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
// 		  >
// 	: never

// export type Subtract<A extends number | bigint, B extends number | bigint, Fail = never> = [
// 	NumericStruct.FromNumeric<A>,
// 	NumericStruct.FromNumeric<B>
// ] extends [infer MA extends NumericStruct, infer MB extends NumericStruct]
// 	? [MA[1], MB[1]] extends ['+', '+']
// 		? NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '+', DigitsStruct.SubtractNormalized<MA[2], MB[2], []>]>
// 		  >
// 		: [MA[1], MB[1]] extends ['+', '-']
// 		? NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '+', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
// 		  >
// 		: [MA[1], MB[1]] extends ['-', '+']
// 		? NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '-', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
// 		  >
// 		: NumericStruct.NormalizedToNumeric<
// 				NumericStruct.Normalize<[MA[0], '+', DigitsStruct.SubtractNormalized<MB[2], MA[2], []>]>
// 		  >
// 	: never
