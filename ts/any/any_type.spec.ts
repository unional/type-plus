import { it } from '@jest/globals'
import { testType, type AnyType } from '../index.js'

it('returns any for any', () => {
	testType.equal<AnyType<any>, any>(true)
})

it('returns never for other special types', () => {
	testType.never<AnyType<unknown>>(true)
	testType.never<AnyType<void>>(true)
	testType.never<AnyType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<AnyType<undefined>>(true)
	testType.never<AnyType<null>>(true)
	testType.never<AnyType<boolean>>(true)
	testType.never<AnyType<true>>(true)
	testType.never<AnyType<false>>(true)
	testType.never<AnyType<number>>(true)
	testType.never<AnyType<1>>(true)
	testType.never<AnyType<string>>(true)
	testType.never<AnyType<''>>(true)
	testType.never<AnyType<symbol>>(true)
	testType.never<AnyType<bigint>>(true)
	testType.never<AnyType<1n>>(true)
	testType.never<AnyType<{}>>(true)
	testType.never<AnyType<{ a: 1 }>>(true)
	testType.never<AnyType<string[]>>(true)
	testType.never<AnyType<[]>>(true)
	testType.never<AnyType<Function>>(true)
	testType.never<AnyType<() => void>>(true)
})

it('returns any for union type', () => {
	testType.any<AnyType<any | 1>>(true)
})

it('returns any for intersection type', () => {
	testType.any<AnyType<any & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<AnyType<any, 1, 2>, 1>(true)
	testType.equal<AnyType<0, 1, 2>, 2>(true)

	testType.equal<AnyType<never, 1, 2>, 2>(true)
	testType.equal<AnyType<unknown, 1, 2>, 2>(true)
	testType.equal<AnyType<void, 1, 2>, 2>(true)
})
