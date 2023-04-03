import { it } from '@jest/globals'
import { testType, type IsNotAny } from '../index.js'

it('returns false for any', () => {
	testType.false<IsNotAny<any>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotAny<unknown>>(true)
	testType.true<IsNotAny<void>>(true)
	testType.true<IsNotAny<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotAny<undefined>>(true)
	testType.true<IsNotAny<null>>(true)
	testType.true<IsNotAny<boolean>>(true)
	testType.true<IsNotAny<true>>(true)
	testType.true<IsNotAny<false>>(true)
	testType.true<IsNotAny<number>>(true)
	testType.true<IsNotAny<1>>(true)
	testType.true<IsNotAny<string>>(true)
	testType.true<IsNotAny<''>>(true)
	testType.true<IsNotAny<symbol>>(true)
	testType.true<IsNotAny<bigint>>(true)
	testType.true<IsNotAny<1n>>(true)
	testType.true<IsNotAny<{}>>(true)
	testType.true<IsNotAny<string[]>>(true)
	testType.true<IsNotAny<[]>>(true)
	testType.true<IsNotAny<Function>>(true)
	testType.true<IsNotAny<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsNotAny<any | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotAny<any & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotAny<any, 1, 2>, 2>(true)
	testType.equal<IsNotAny<0, 1, 2>, 1>(true)

	testType.equal<IsNotAny<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotAny<never, 1, 2>, 1>(true)
	testType.equal<IsNotAny<void, 1, 2>, 1>(true)
})
