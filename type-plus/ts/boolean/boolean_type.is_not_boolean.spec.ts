import { it } from '@jest/globals'
import { testType, type IsNotBoolean } from '../index.js'

it('returns false if T is boolean', () => {
	testType.false<IsNotBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	testType.false<IsNotBoolean<true>>(true)
	testType.false<IsNotBoolean<false>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotBoolean<void>>(true)
	testType.true<IsNotBoolean<unknown>>(true)
	testType.true<IsNotBoolean<any>>(true)
	testType.true<IsNotBoolean<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotBoolean<undefined>>(true)
	testType.true<IsNotBoolean<null>>(true)
	testType.true<IsNotBoolean<number>>(true)
	testType.true<IsNotBoolean<1>>(true)
	testType.true<IsNotBoolean<string>>(true)
	testType.true<IsNotBoolean<''>>(true)
	testType.true<IsNotBoolean<symbol>>(true)
	testType.true<IsNotBoolean<bigint>>(true)
	testType.true<IsNotBoolean<{}>>(true)
	testType.true<IsNotBoolean<string[]>>(true)
	testType.true<IsNotBoolean<[]>>(true)
	testType.true<IsNotBoolean<Function>>(true)
	testType.true<IsNotBoolean<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotBoolean<boolean | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotBoolean<boolean, 1, 2>, 2>(true)
	testType.equal<IsNotBoolean<true, 1, 2>, 2>(true)
	testType.equal<IsNotBoolean<false, 1, 2>, 2>(true)

	testType.equal<IsNotBoolean<any, 1, 2>, 1>(true)
	testType.equal<IsNotBoolean<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotBoolean<never, 1, 2>, 1>(true)
	testType.equal<IsNotBoolean<void, 1, 2>, 1>(true)
})
