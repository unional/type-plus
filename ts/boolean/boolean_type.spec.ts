import { it } from '@jest/globals'
import { testType, type BooleanType } from '../index.js'

it('returns T if T is boolean', () => {
	testType.equal<BooleanType<boolean>, boolean>(true)
	testType.equal<BooleanType<true>, true>(true)
	testType.equal<BooleanType<false>, false>(true)
})

it('returns never for special types', () => {
	testType.never<BooleanType<void>>(true)
	testType.never<BooleanType<unknown>>(true)
	testType.never<BooleanType<any>>(true)
	testType.never<BooleanType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<BooleanType<undefined>>(true)
	testType.never<BooleanType<null>>(true)
	testType.never<BooleanType<number>>(true)
	testType.never<BooleanType<1>>(true)
	testType.never<BooleanType<string>>(true)
	testType.never<BooleanType<''>>(true)
	testType.never<BooleanType<symbol>>(true)
	testType.never<BooleanType<bigint>>(true)
	testType.never<BooleanType<1n>>(true)
	testType.never<BooleanType<{}>>(true)
	testType.never<BooleanType<{ a: 1 }>>(true)
	testType.never<BooleanType<string[]>>(true)
	testType.never<BooleanType<[]>>(true)
	testType.never<BooleanType<Function>>(true)
	testType.never<BooleanType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<BooleanType<boolean | 1>>(true)
})

it('returns T for intersection type', () => {
	testType.equal<BooleanType<boolean & { a: 1 }>, boolean & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<BooleanType<boolean, 1, 2>, 1>(true)
	testType.equal<BooleanType<0, 1, 2>, 2>(true)

	testType.equal<BooleanType<any, 1, 2>, 2>(true)
	testType.equal<BooleanType<unknown, 1, 2>, 2>(true)
	testType.equal<BooleanType<never, 1, 2>, 2>(true)
	testType.equal<BooleanType<void, 1, 2>, 2>(true)
})
