import { testType, type IsNotNever } from '../index.js'

it('returns false for never', () => {
	testType.false<IsNotNever<never>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotNever<unknown>>(true)
	testType.true<IsNotNever<void>>(true)
	testType.true<IsNotNever<any>>(true)
})

test('returns true for singular types', () => {
	testType.true<IsNotNever<undefined>>(true)
	testType.true<IsNotNever<null>>(true)
	testType.true<IsNotNever<number>>(true)
	testType.true<IsNotNever<1>>(true)
	testType.true<IsNotNever<boolean>>(true)
	testType.true<IsNotNever<true>>(true)
	testType.true<IsNotNever<false>>(true)
	testType.true<IsNotNever<string>>(true)
	testType.true<IsNotNever<''>>(true)
	testType.true<IsNotNever<symbol>>(true)
	testType.true<IsNotNever<bigint>>(true)
	testType.true<IsNotNever<1n>>(true)
	testType.true<IsNotNever<{}>>(true)
	testType.true<IsNotNever<string[]>>(true)
	testType.true<IsNotNever<[]>>(true)
	testType.true<IsNotNever<Function>>(true)
	testType.true<IsNotNever<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotNever<never | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotNever<never, 1, 2>, 2>(true)
	testType.equal<IsNotNever<0, 1, 2>, 1>(true)

	testType.equal<IsNotNever<any, 1, 2>, 1>(true)
	testType.equal<IsNotNever<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotNever<void, 1, 2>, 1>(true)
})
