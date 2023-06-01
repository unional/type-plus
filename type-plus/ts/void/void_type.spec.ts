import { it } from '@jest/globals'
import { testType, type VoidType } from '../index.js'

it('returns T if T is void', () => {
	testType.equal<VoidType<void>, void>(true)
})

it('returns never for other special types', () => {
	testType.never<VoidType<any>>(true)
	testType.never<VoidType<unknown>>(true)
	testType.never<VoidType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<VoidType<undefined>>(true)
	testType.never<VoidType<null>>(true)
	testType.never<VoidType<number>>(true)
	testType.never<VoidType<1>>(true)
	testType.never<VoidType<boolean>>(true)
	testType.never<VoidType<true>>(true)
	testType.never<VoidType<false>>(true)
	testType.never<VoidType<string>>(true)
	testType.never<VoidType<''>>(true)
	testType.never<VoidType<symbol>>(true)
	testType.never<VoidType<bigint>>(true)
	testType.never<VoidType<1n>>(true)
	testType.never<VoidType<{}>>(true)
	testType.never<VoidType<string[]>>(true)
	testType.never<VoidType<[]>>(true)
	testType.never<VoidType<Function>>(true)
	testType.never<VoidType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<VoidType<void | 1>>(true)
})

it('returns T for intersection type', () => {
	testType.equal<VoidType<void & { a: 1 }>, void & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<VoidType<void, 1, 2>, 1>(true)
	testType.equal<VoidType<0, 1, 2>, 2>(true)

	testType.equal<VoidType<any, 1, 2>, 2>(true)
	testType.equal<VoidType<unknown, 1, 2>, 2>(true)
	testType.equal<VoidType<never, 1, 2>, 2>(true)
})
