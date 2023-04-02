import { testType, type IsNotNull } from '../index.js'

it('returns false for null', () => {
	testType.false<IsNotNull<null>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNull<any>>(true)
	testType.true<IsNotNull<unknown>>(true)
	testType.true<IsNotNull<void>>(true)
	testType.true<IsNotNull<never>>(true)
})

test('returns true for other types', () => {
	testType.true<IsNotNull<undefined>>(true)
	testType.true<IsNotNull<boolean>>(true)
	testType.true<IsNotNull<true>>(true)
	testType.true<IsNotNull<false>>(true)
	testType.true<IsNotNull<number>>(true)
	testType.true<IsNotNull<1>>(true)
	testType.true<IsNotNull<string>>(true)
	testType.true<IsNotNull<''>>(true)
	testType.true<IsNotNull<symbol>>(true)
	testType.true<IsNotNull<bigint>>(true)
	testType.true<IsNotNull<{}>>(true)
	testType.true<IsNotNull<string[]>>(true)
	testType.true<IsNotNull<[]>>(true)
	testType.true<IsNotNull<Function>>(true)
	testType.true<IsNotNull<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotNull<null | 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotNull<null, 1, 2>, 2>(true)

	testType.equal<IsNotNull<any, 1, 2>, 1>(true)
	testType.equal<IsNotNull<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotNull<never, 1, 2>, 1>(true)
	testType.equal<IsNotNull<void, 1, 2>, 1>(true)
})
