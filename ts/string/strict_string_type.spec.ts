import { it } from '@jest/globals'
import { testType, type StrictStringType } from '../index.js'

it('returns T if T is string', () => {
	testType.equal<StrictStringType<string>, string>(true)
})

it('returns never if T is a string literal', () => {
	testType.never<StrictStringType<''>>(true)
	testType.never<StrictStringType<'a'>>(true)
})

it('returns never for special types', () => {
	testType.never<StrictStringType<any>>(true)
	testType.never<StrictStringType<unknown>>(true)
	testType.never<StrictStringType<void>>(true)
	testType.never<StrictStringType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StrictStringType<undefined>>(true)
	testType.never<StrictStringType<null>>(true)
	testType.never<StrictStringType<boolean>>(true)
	testType.never<StrictStringType<true>>(true)
	testType.never<StrictStringType<false>>(true)
	testType.never<StrictStringType<number>>(true)
	testType.never<StrictStringType<1>>(true)
	testType.never<StrictStringType<''>>(true)
	testType.never<StrictStringType<symbol>>(true)
	testType.never<StrictStringType<bigint>>(true)
	testType.never<StrictStringType<{}>>(true)
	testType.never<StrictStringType<string[]>>(true)
	testType.never<StrictStringType<[]>>(true)
	testType.never<StrictStringType<Function>>(true)
	testType.never<StrictStringType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<StrictStringType<string | 1>>(true)
})

it('returns never for intersection type', () => {
	testType.equal<StrictStringType<string & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<StrictStringType<string, 1, 2>, 1>(true)
	testType.equal<StrictStringType<'', 1, 2>, 2>(true)
	testType.equal<StrictStringType<'a', 1, 2>, 2>(true)

	testType.equal<StrictStringType<any, 1, 2>, 2>(true)
	testType.equal<StrictStringType<unknown, 1, 2>, 2>(true)
	testType.equal<StrictStringType<never, 1, 2>, 2>(true)
	testType.equal<StrictStringType<void, 1, 2>, 2>(true)
})
