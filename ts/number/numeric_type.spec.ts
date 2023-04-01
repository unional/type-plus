import { type, type NumericType } from '../index.js'

it('returns T if T is number', () => {
	type.equal<NumericType<number>, number>(true)
})

it('returns T if T is number literial', () => {
	type.equal<NumericType<-1>, -1>(true)
	type.equal<NumericType<0>, 0>(true)
	type.equal<NumericType<1>, 1>(true)
	type.equal<NumericType<1.1>, 1.1>(true)
})

it('returns T if T is bigint and bigint literals', () => {
	type.equal<NumericType<bigint>, bigint>(true)
	type.equal<NumericType<1n>, 1n>(true)
})

it('returns never for special types', () => {
	type.never<NumericType<void>>(true)
	type.never<NumericType<unknown>>(true)
	type.never<NumericType<any>>(true)
	type.never<NumericType<never>>(true)
})

it('returns never for other types', () => {
	type.never<NumericType<undefined>>(true)
	type.never<NumericType<null>>(true)
	type.never<NumericType<boolean>>(true)
	type.never<NumericType<true>>(true)
	type.never<NumericType<false>>(true)
	type.never<NumericType<string>>(true)
	type.never<NumericType<''>>(true)
	type.never<NumericType<symbol>>(true)
	type.never<NumericType<{}>>(true)
	type.never<NumericType<string[]>>(true)
	type.never<NumericType<[]>>(true)
	type.never<NumericType<Function>>(true)
	type.never<NumericType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	type.never<NumericType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	type.equal<NumericType<number | 1>, number>(true)
})

it('returns T if T is union of mixing number and bigint', () => {
	type.equal<NumericType<number | bigint>, number | bigint>(true)
	type.equal<NumericType<bigint | 1>, bigint | 1>(true)
	type.equal<NumericType<number | 1n>, number | 1n>(true)
	type.equal<NumericType<1 | 1n>, 1 | 1n>(true)
})

it('returns T if T is union of bigint and bigint literal', () => {
	type.equal<NumericType<bigint | 1n>, bigint>(true)
})

it('returns T if T is intersection of number', () => {
	type.equal<NumericType<number & { a: 1 }>, number & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<NumericType<number, 1, 2>, 1>(true)
	type.equal<NumericType<0, 1, 2>, 1>(true)

	type.equal<NumericType<any, 1, 2>, 2>(true)
	type.equal<NumericType<unknown, 1, 2>, 2>(true)
	type.equal<NumericType<never, 1, 2>, 2>(true)
	type.equal<NumericType<void, 1, 2>, 2>(true)
})
