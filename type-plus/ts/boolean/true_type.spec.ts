import { it } from '@jest/globals'
import { testType, type TrueType } from '../index.js'

it('returns T if T is true', () => {
	testType.equal<TrueType<true>, true>(true)
})

it('returns never if T is boolean or false', () => {
	testType.never<TrueType<boolean>>(true)
	testType.never<TrueType<false>>(true)
})

it('returns never for special types', () => {
	testType.never<TrueType<void>>(true)
	testType.never<TrueType<unknown>>(true)
	testType.never<TrueType<any>>(true)
	testType.never<TrueType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<TrueType<undefined>>(true)
	testType.never<TrueType<null>>(true)
	testType.never<TrueType<number>>(true)
	testType.never<TrueType<1>>(true)
	testType.never<TrueType<string>>(true)
	testType.never<TrueType<''>>(true)
	testType.never<TrueType<symbol>>(true)
	testType.never<TrueType<bigint>>(true)
	testType.never<TrueType<1n>>(true)
	testType.never<TrueType<{}>>(true)
	testType.never<TrueType<{ a: 1 }>>(true)
	testType.never<TrueType<string[]>>(true)
	testType.never<TrueType<[]>>(true)
	testType.never<TrueType<Function>>(true)
	testType.never<TrueType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<TrueType<true | 1>>(true)
	testType.never<TrueType<true | boolean>>(true)
})

it('returns never for intersection type', () => {
	testType.never<TrueType<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<TrueType<true, 1, 2>, 1>(true)

	testType.equal<TrueType<any, 1, 2>, 2>(true)
	testType.equal<TrueType<unknown, 1, 2>, 2>(true)
	testType.equal<TrueType<never, 1, 2>, 2>(true)
	testType.equal<TrueType<void, 1, 2>, 2>(true)
})
