import { testType, type IsAny } from '../index.js'

it('returns true for any', () => {
	testType.true<IsAny<any>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsAny<unknown>>(true)
	testType.false<IsAny<void>>(true)
	testType.false<IsAny<never>>(true)
})

test('returns false for other types', () => {
	testType.false<IsAny<undefined>>(true)
	testType.false<IsAny<null>>(true)
	testType.false<IsAny<boolean>>(true)
	testType.false<IsAny<true>>(true)
	testType.false<IsAny<false>>(true)
	testType.false<IsAny<number>>(true)
	testType.false<IsAny<1>>(true)
	testType.false<IsAny<string>>(true)
	testType.false<IsAny<''>>(true)
	testType.false<IsAny<symbol>>(true)
	testType.false<IsAny<bigint>>(true)
	testType.false<IsAny<1n>>(true)
	testType.false<IsAny<{}>>(true)
	testType.false<IsAny<{ a: 1 }>>(true)
	testType.false<IsAny<string[]>>(true)
	testType.false<IsAny<[]>>(true)
	testType.false<IsAny<Function>>(true)
	testType.false<IsAny<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsAny<any | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsAny<any & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsAny<any, 1, 2>, 1>(true)
	testType.equal<IsAny<0, 1, 2>, 2>(true)

	testType.equal<IsAny<unknown, 1, 2>, 2>(true)
	testType.equal<IsAny<never, 1, 2>, 2>(true)
	testType.equal<IsAny<void, 1, 2>, 2>(true)
})
