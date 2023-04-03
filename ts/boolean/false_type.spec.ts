import { it } from '@jest/globals'
import { FalseType, testType } from '../index.js'

it('returns T if T is false', () => {
	testType.equal<FalseType<false>, false>(true)
})

it('returns never if T is boolean or true', () => {
	testType.never<FalseType<boolean>>(true)
	testType.never<FalseType<true>>(true)
})

it('returns never for special types', () => {
	testType.never<FalseType<void>>(true)
	testType.never<FalseType<unknown>>(true)
	testType.never<FalseType<any>>(true)
	testType.never<FalseType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<FalseType<undefined>>(true)
	testType.never<FalseType<null>>(true)
	testType.never<FalseType<number>>(true)
	testType.never<FalseType<1>>(true)
	testType.never<FalseType<string>>(true)
	testType.never<FalseType<''>>(true)
	testType.never<FalseType<symbol>>(true)
	testType.never<FalseType<bigint>>(true)
	testType.never<FalseType<1n>>(true)
	testType.never<FalseType<{}>>(true)
	testType.never<FalseType<{ a: 1 }>>(true)
	testType.never<FalseType<string[]>>(true)
	testType.never<FalseType<[]>>(true)
	testType.never<FalseType<Function>>(true)
	testType.never<FalseType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<FalseType<false | 1>>(true)
	testType.never<FalseType<false | boolean>>(true)
})

it('returns never for intersection type', () => {
	testType.never<FalseType<false & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<FalseType<false, 1, 2>, 1>(true)
	testType.equal<FalseType<0, 1, 2>, 2>(true)

	testType.equal<FalseType<any, 1, 2>, 2>(true)
	testType.equal<FalseType<unknown, 1, 2>, 2>(true)
	testType.equal<FalseType<never, 1, 2>, 2>(true)
	testType.equal<FalseType<void, 1, 2>, 2>(true)
})
