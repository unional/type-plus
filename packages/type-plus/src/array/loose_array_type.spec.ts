import { it } from '@jest/globals'

import { type LooseArrayType, testType } from '../index.js'

it('returns T if T is array', () => {
	testType.equal<LooseArrayType<string[]>, string[]>(true)
})

it('returns T if T is tuple', () => {
	testType.equal<LooseArrayType<[]>, []>(true)
	testType.equal<LooseArrayType<[1]>, [1]>(true)
})
1
it('returns never for special types', () => {
	testType.never<LooseArrayType<void>>(true)
	testType.never<LooseArrayType<unknown>>(true)
	testType.never<LooseArrayType<any>>(true)
	testType.never<LooseArrayType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<LooseArrayType<undefined>>(true)
	testType.never<LooseArrayType<null>>(true)
	testType.never<LooseArrayType<boolean>>(true)
	testType.never<LooseArrayType<true>>(true)
	testType.never<LooseArrayType<false>>(true)
	testType.never<LooseArrayType<number>>(true)
	testType.never<LooseArrayType<1>>(true)
	testType.never<LooseArrayType<string>>(true)
	testType.never<LooseArrayType<''>>(true)
	testType.never<LooseArrayType<symbol>>(true)
	testType.never<LooseArrayType<bigint>>(true)
	testType.never<LooseArrayType<1n>>(true)
	testType.never<LooseArrayType<{}>>(true)
	testType.never<LooseArrayType<{ a: 1 }>>(true)
	testType.never<LooseArrayType<Function>>(true)
	testType.never<LooseArrayType<() => void>>(true)
})

it('returns T for union type', () => {
	testType.equal<LooseArrayType<number[] | 1>, number[] | 1>(true)
})

it('returns T for intersection type', () => {
	testType.equal<LooseArrayType<number[] & 1>, number[] & 1>(true)
})

it('can override Then/Else', () => {
	testType.equal<LooseArrayType<string[], 1, 2>, 1>(true)
	testType.equal<LooseArrayType<[], 1, 2>, 1>(true)

	testType.equal<LooseArrayType<any, 1, 2>, 2>(true)
	testType.equal<LooseArrayType<unknown, 1, 2>, 2>(true)
	testType.equal<LooseArrayType<never, 1, 2>, 2>(true)
	testType.equal<LooseArrayType<void, 1, 2>, 2>(true)
})

it('supports readonly array', () => {
	testType.equal<LooseArrayType<readonly string[]>, readonly string[]>(true)
})
