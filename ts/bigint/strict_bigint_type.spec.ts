import { it } from '@jest/globals'
import { testType, type StrictBigintType } from '../index.js'

it('returns T if T is bigint', () => {
	testType.equal<StrictBigintType<bigint>, bigint>(true)
})

it('returns never if T is bigint literals', () => {
	testType.never<StrictBigintType<0n>>(true)
	testType.never<StrictBigintType<11111111111111111111111111111111n>>(true)
})

it('returns never for special types', () => {
	testType.never<StrictBigintType<any>>(true)
	testType.never<StrictBigintType<unknown>>(true)
	testType.never<StrictBigintType<void>>(true)
	testType.never<StrictBigintType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StrictBigintType<undefined>>(true)
	testType.never<StrictBigintType<null>>(true)
	testType.never<StrictBigintType<boolean>>(true)
	testType.never<StrictBigintType<true>>(true)
	testType.never<StrictBigintType<false>>(true)
	testType.never<StrictBigintType<number>>(true)
	testType.never<StrictBigintType<1>>(true)
	testType.never<StrictBigintType<string>>(true)
	testType.never<StrictBigintType<''>>(true)
	testType.never<StrictBigintType<symbol>>(true)
	testType.never<StrictBigintType<{}>>(true)
	testType.never<StrictBigintType<string[]>>(true)
	testType.never<StrictBigintType<[]>>(true)
	testType.never<StrictBigintType<Function>>(true)
	testType.never<StrictBigintType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<StrictBigintType<bigint | 1>>(true)
	testType.never<StrictBigintType<bigint | 'a'>>(true)
})

it('returns never for intersection type', () => {
	testType.never<StrictBigintType<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<StrictBigintType<bigint, 1, 2>, 1>(true)
	testType.equal<StrictBigintType<1n, 1, 2>, 2>(true)

	testType.equal<StrictBigintType<any, 1, 2>, 2>(true)
	testType.equal<StrictBigintType<unknown, 1, 2>, 2>(true)
	testType.equal<StrictBigintType<never, 1, 2>, 2>(true)
	testType.equal<StrictBigintType<void, 1, 2>, 2>(true)
})
