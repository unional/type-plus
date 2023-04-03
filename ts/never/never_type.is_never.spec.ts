import { it } from '@jest/globals'
// never intersect with any type is never
import { testType, type IsNever } from '../index.js'

it('returns true for never', () => {
	testType.true<IsNever<never>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsNever<unknown>>(true)
	testType.false<IsNever<void>>(true)
	testType.false<IsNever<any>>(true)
})

it('returns false for other types', () => {
	testType.false<IsNever<undefined>>(true)
	testType.false<IsNever<null>>(true)
	testType.false<IsNever<number>>(true)
	testType.false<IsNever<1>>(true)
	testType.false<IsNever<boolean>>(true)
	testType.false<IsNever<true>>(true)
	testType.false<IsNever<false>>(true)
	testType.false<IsNever<string>>(true)
	testType.false<IsNever<''>>(true)
	testType.false<IsNever<symbol>>(true)
	testType.false<IsNever<bigint>>(true)
	testType.false<IsNever<1n>>(true)
	testType.false<IsNever<{}>>(true)
	testType.false<IsNever<string[]>>(true)
	testType.false<IsNever<[]>>(true)
	testType.false<IsNever<Function>>(true)
	testType.false<IsNever<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsNever<never | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNever<never, 1, 2>, 1>(true)
	testType.equal<IsNever<0, 1, 2>, 2>(true)

	testType.equal<IsNever<any, 1, 2>, 2>(true)
	testType.equal<IsNever<unknown, 1, 2>, 2>(true)
	testType.equal<IsNever<void, 1, 2>, 2>(true)
})
