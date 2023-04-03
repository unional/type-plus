import { it } from '@jest/globals'
import { testType, type NullType } from '../index.js'

it('returns T if T is null', () => {
	testType.equal<NullType<null>, null>(true)
})

it('returns never for special types', () => {
	testType.never<NullType<any>>(true)
	testType.never<NullType<unknown>>(true)
	testType.never<NullType<void>>(true)
	testType.never<NullType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<NullType<undefined>>(true)
	testType.never<NullType<number>>(true)
	testType.never<NullType<boolean>>(true)
	testType.never<NullType<true>>(true)
	testType.never<NullType<false>>(true)
	testType.never<NullType<string>>(true)
	testType.never<NullType<''>>(true)
	testType.never<NullType<symbol>>(true)
	testType.never<NullType<bigint>>(true)
	testType.never<NullType<{}>>(true)
	testType.never<NullType<string[]>>(true)
	testType.never<NullType<[]>>(true)
	testType.never<NullType<Function>>(true)
	testType.never<NullType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<NullType<null | 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NullType<null, 1, 2>, 1>(true)

	testType.equal<NullType<any, 1, 2>, 2>(true)
	testType.equal<NullType<unknown, 1, 2>, 2>(true)
	testType.equal<NullType<never, 1, 2>, 2>(true)
	testType.equal<NullType<void, 1, 2>, 2>(true)
})
