import { it } from '@jest/globals'

import { type ArrayType,testType } from '../index.js'

it('returns T if T is array', () => {
	testType.equal<ArrayType<any[]>, any[]>(true)
	testType.equal<ArrayType<unknown[]>, unknown[]>(true)
	testType.equal<ArrayType<never[]>, never[]>(true)
	testType.equal<ArrayType<void[]>, void[]>(true)

	testType.equal<ArrayType<string[]>, string[]>(true)
	testType.equal<ArrayType<Array<string | number>>, Array<string | number>>(true)
})

it('returns never if T is tuple', () => {
	testType.never<ArrayType<[]>>(true)
	testType.never<ArrayType<[1]>>(true)
})

it('returns never for special types', () => {
	testType.never<ArrayType<void>>(true)
	testType.never<ArrayType<unknown>>(true)
	testType.never<ArrayType<any>>(true)
	testType.never<ArrayType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<ArrayType<undefined>>(true)
	testType.never<ArrayType<null>>(true)
	testType.never<ArrayType<boolean>>(true)
	testType.never<ArrayType<true>>(true)
	testType.never<ArrayType<false>>(true)
	testType.never<ArrayType<number>>(true)
	testType.never<ArrayType<1>>(true)
	testType.never<ArrayType<string>>(true)
	testType.never<ArrayType<''>>(true)
	testType.never<ArrayType<symbol>>(true)
	testType.never<ArrayType<bigint>>(true)
	testType.never<ArrayType<1n>>(true)
	testType.never<ArrayType<{}>>(true)
	testType.never<ArrayType<{ a: 1 }>>(true)
	testType.never<ArrayType<[]>>(true)
	testType.never<ArrayType<Function>>(true)
	testType.never<ArrayType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<ArrayType<number[] | 1>>(true)
})

it('returns never for intersection type', () => {
	testType.never<ArrayType<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<ArrayType<string[], 1, 2>, 1>(true)
	testType.equal<ArrayType<[], 1, 2>, 2>(true)

	testType.equal<ArrayType<any, 1, 2>, 2>(true)
	testType.equal<ArrayType<unknown, 1, 2>, 2>(true)
	testType.equal<ArrayType<never, 1, 2>, 2>(true)
	testType.equal<ArrayType<void, 1, 2>, 2>(true)
})

it('supports readonly array', () => {
	testType.equal<ArrayType<readonly string[]>, readonly string[]>(true)
})
