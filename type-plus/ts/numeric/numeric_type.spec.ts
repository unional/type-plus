import { it } from '@jest/globals'
import { testType, type NumericType } from '../index.js'

it('returns T if T is number', () => {
	testType.equal<NumericType<number>, number>(true)
})

it('returns T if T is number literial', () => {
	testType.equal<NumericType<-1>, -1>(true)
	testType.equal<NumericType<0>, 0>(true)
	testType.equal<NumericType<1>, 1>(true)
	testType.equal<NumericType<1.1>, 1.1>(true)
})

it('returns T if T is bigint and bigint literals', () => {
	testType.equal<NumericType<bigint>, bigint>(true)
	testType.equal<NumericType<1n>, 1n>(true)
})

it('returns never for special types', () => {
	testType.never<NumericType<void>>(true)
	testType.never<NumericType<unknown>>(true)
	testType.never<NumericType<any>>(true)
	testType.never<NumericType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<NumericType<undefined>>(true)
	testType.never<NumericType<null>>(true)
	testType.never<NumericType<boolean>>(true)
	testType.never<NumericType<true>>(true)
	testType.never<NumericType<false>>(true)
	testType.never<NumericType<string>>(true)
	testType.never<NumericType<''>>(true)
	testType.never<NumericType<symbol>>(true)
	testType.never<NumericType<{}>>(true)
	testType.never<NumericType<string[]>>(true)
	testType.never<NumericType<[]>>(true)
	testType.never<NumericType<Function>>(true)
	testType.never<NumericType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	testType.never<NumericType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	testType.equal<NumericType<number | 1>, number>(true)
})

it('returns T if T is union of mixing number and bigint', () => {
	testType.equal<NumericType<number | bigint>, number | bigint>(true)
	testType.equal<NumericType<bigint | 1>, bigint | 1>(true)
	testType.equal<NumericType<number | 1n>, number | 1n>(true)
	testType.equal<NumericType<1 | 1n>, 1 | 1n>(true)
})

it('returns T if T is union of bigint and bigint literal', () => {
	testType.equal<NumericType<bigint | 1n>, bigint>(true)
})

it('returns T if T is intersection of number', () => {
	testType.equal<NumericType<number & { a: 1 }>, number & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NumericType<number, 1, 2>, 1>(true)
	testType.equal<NumericType<0, 1, 2>, 1>(true)

	testType.equal<NumericType<any, 1, 2>, 2>(true)
	testType.equal<NumericType<unknown, 1, 2>, 2>(true)
	testType.equal<NumericType<never, 1, 2>, 2>(true)
	testType.equal<NumericType<void, 1, 2>, 2>(true)
})
