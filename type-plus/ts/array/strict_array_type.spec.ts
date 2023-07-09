import { it } from '@jest/globals'
import { testType, type StrictArrayType } from '../index.js'

it('returns T if T is array', () => {
	testType.equal<StrictArrayType<string[]>, string[]>(true)
})

it('returns never if T is tuple', () => {
	testType.never<StrictArrayType<[]>>(true)
	testType.never<StrictArrayType<[1]>>(true)
})

it('returns never for special types', () => {
	testType.never<StrictArrayType<void>>(true)
	testType.never<StrictArrayType<unknown>>(true)
	testType.never<StrictArrayType<any>>(true)
	testType.never<StrictArrayType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StrictArrayType<undefined>>(true)
	testType.never<StrictArrayType<null>>(true)
	testType.never<StrictArrayType<boolean>>(true)
	testType.never<StrictArrayType<true>>(true)
	testType.never<StrictArrayType<false>>(true)
	testType.never<StrictArrayType<number>>(true)
	testType.never<StrictArrayType<1>>(true)
	testType.never<StrictArrayType<string>>(true)
	testType.never<StrictArrayType<''>>(true)
	testType.never<StrictArrayType<symbol>>(true)
	testType.never<StrictArrayType<bigint>>(true)
	testType.never<StrictArrayType<1n>>(true)
	testType.never<StrictArrayType<{}>>(true)
	testType.never<StrictArrayType<{ a: 1 }>>(true)
	testType.never<StrictArrayType<[]>>(true)
	testType.never<StrictArrayType<Function>>(true)
	testType.never<StrictArrayType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<StrictArrayType<number[] | 1>>(true)
})

it('returns never for intersection type', () => {
	testType.never<StrictArrayType<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<StrictArrayType<string[], 1, 2>, 1>(true)
	testType.equal<StrictArrayType<[], 1, 2>, 2>(true)

	testType.equal<StrictArrayType<any, 1, 2>, 2>(true)
	testType.equal<StrictArrayType<unknown, 1, 2>, 2>(true)
	testType.equal<StrictArrayType<never, 1, 2>, 2>(true)
	testType.equal<StrictArrayType<void, 1, 2>, 2>(true)
})

it('supports readonly array', () => {
	testType.equal<StrictArrayType<readonly string[]>, readonly string[]>(true)
})
