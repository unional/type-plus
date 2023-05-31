import { it } from '@jest/globals'
import { testType, type AnyOrNeverType } from '../index.js'

it('returns any for any', () => {
	testType.equal<AnyOrNeverType<any>, any>(true)
})

it('returns never for never', () => {
	testType.equal<AnyOrNeverType<never>, never>(true)
})

it('returns never for other special types', () => {
	testType.never<AnyOrNeverType<unknown>>(true)
	testType.never<AnyOrNeverType<void>>(true)
})

it('returns never for other types', () => {
	testType.never<AnyOrNeverType<undefined>>(true)
	testType.never<AnyOrNeverType<null>>(true)
	testType.never<AnyOrNeverType<boolean>>(true)
	testType.never<AnyOrNeverType<true>>(true)
	testType.never<AnyOrNeverType<false>>(true)
	testType.never<AnyOrNeverType<number>>(true)
	testType.never<AnyOrNeverType<1>>(true)
	testType.never<AnyOrNeverType<string>>(true)
	testType.never<AnyOrNeverType<''>>(true)
	testType.never<AnyOrNeverType<symbol>>(true)
	testType.never<AnyOrNeverType<bigint>>(true)
	testType.never<AnyOrNeverType<1n>>(true)
	testType.never<AnyOrNeverType<{}>>(true)
	testType.never<AnyOrNeverType<{ a: 1 }>>(true)
	testType.never<AnyOrNeverType<string[]>>(true)
	testType.never<AnyOrNeverType<[]>>(true)
	testType.never<AnyOrNeverType<Function>>(true)
	testType.never<AnyOrNeverType<() => void>>(true)
})

it('returns any for union type', () => {
	testType.any<AnyOrNeverType<any | 1>>(true)
})

it('returns any for intersection type', () => {
	testType.any<AnyOrNeverType<any & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<AnyOrNeverType<any, 1, 2>, 1>(true)
	testType.equal<AnyOrNeverType<never, 1, 2>, 1>(true)

	testType.equal<AnyOrNeverType<0, 1, 2>, 2>(true)
	testType.equal<AnyOrNeverType<unknown, 1, 2>, 2>(true)
	testType.equal<AnyOrNeverType<void, 1, 2>, 2>(true)
})
