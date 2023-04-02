import { testType, type IsNull } from '../index.js'

it('returns true for null', () => {
	testType.true<IsNull<null>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNull<any>>(true)
	testType.false<IsNull<unknown>>(true)
	testType.false<IsNull<void>>(true)
	testType.false<IsNull<never>>(true)
})

test('returns false for other types', () => {
	testType.false<IsNull<undefined>>(true)
	testType.false<IsNull<boolean>>(true)
	testType.false<IsNull<true>>(true)
	testType.false<IsNull<false>>(true)
	testType.false<IsNull<number>>(true)
	testType.false<IsNull<1>>(true)
	testType.false<IsNull<string>>(true)
	testType.false<IsNull<''>>(true)
	testType.false<IsNull<symbol>>(true)
	testType.false<IsNull<bigint>>(true)
	testType.false<IsNull<{}>>(true)
	testType.false<IsNull<string[]>>(true)
	testType.false<IsNull<[]>>(true)
	testType.false<IsNull<Function>>(true)
	testType.false<IsNull<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsNull<null | 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNull<null, 1, 2>, 1>(true)

	testType.equal<IsNull<any, 1, 2>, 2>(true)
	testType.equal<IsNull<unknown, 1, 2>, 2>(true)
	testType.equal<IsNull<never, 1, 2>, 2>(true)
	testType.equal<IsNull<void, 1, 2>, 2>(true)
})
