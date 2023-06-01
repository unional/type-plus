import { it } from '@jest/globals'
import { testType, type IsNotFalse } from '../index.js'

it('returns false if T is false', () => {
	testType.false<IsNotFalse<false>>(true)
})

it('returns true if T is boolean or true', () => {
	testType.true<IsNotFalse<boolean>>(true)
	testType.true<IsNotFalse<true>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotFalse<void>>(true)
	testType.true<IsNotFalse<unknown>>(true)
	testType.true<IsNotFalse<any>>(true)
	testType.true<IsNotFalse<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotFalse<undefined>>(true)
	testType.true<IsNotFalse<null>>(true)
	testType.true<IsNotFalse<number>>(true)
	testType.true<IsNotFalse<1>>(true)
	testType.true<IsNotFalse<boolean>>(true)
	testType.true<IsNotFalse<true>>(true)
	testType.true<IsNotFalse<string>>(true)
	testType.true<IsNotFalse<''>>(true)
	testType.true<IsNotFalse<symbol>>(true)
	testType.true<IsNotFalse<bigint>>(true)
	testType.true<IsNotFalse<1n>>(true)
	testType.true<IsNotFalse<{}>>(true)
	testType.true<IsNotFalse<{ a: 1 }>>(true)
	testType.true<IsNotFalse<string[]>>(true)
	testType.true<IsNotFalse<[]>>(true)
	testType.true<IsNotFalse<Function>>(true)
	testType.true<IsNotFalse<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotFalse<false | 1>>(true)
	testType.true<IsNotFalse<false | boolean>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNotFalse<false & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotFalse<false, 1, 2>, 2>(true)
	testType.equal<IsNotFalse<0, 1, 2>, 1>(true)

	testType.equal<IsNotFalse<any, 1, 2>, 1>(true)
	testType.equal<IsNotFalse<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotFalse<never, 1, 2>, 1>(true)
	testType.equal<IsNotFalse<void, 1, 2>, 1>(true)
})
