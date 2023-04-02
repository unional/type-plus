import { testType, type IsVoid } from '../index.js'

it('returns true for void', () => {
	testType.true<IsVoid<void>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsVoid<any>>(true)
	testType.false<IsVoid<unknown>>(true)
	testType.false<IsVoid<never>>(true)
})

test('returns false for singular types', () => {
	testType.false<IsVoid<undefined>>(true)
	testType.false<IsVoid<null>>(true)
	testType.false<IsVoid<number>>(true)
	testType.false<IsVoid<1>>(true)
	testType.false<IsVoid<boolean>>(true)
	testType.false<IsVoid<true>>(true)
	testType.false<IsVoid<false>>(true)
	testType.false<IsVoid<string>>(true)
	testType.false<IsVoid<''>>(true)
	testType.false<IsVoid<symbol>>(true)
	testType.false<IsVoid<bigint>>(true)
	testType.false<IsVoid<1n>>(true)
	testType.false<IsVoid<{}>>(true)
	testType.false<IsVoid<string[]>>(true)
	testType.false<IsVoid<[]>>(true)
	testType.false<IsVoid<Function>>(true)
	testType.false<IsVoid<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsVoid<void | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsVoid<void & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsVoid<void, 1, 2>, 1>(true)
	testType.equal<IsVoid<0, 1, 2>, 2>(true)

	testType.equal<IsVoid<any, 1, 2>, 2>(true)
	testType.equal<IsVoid<unknown, 1, 2>, 2>(true)
	testType.equal<IsVoid<never, 1, 2>, 2>(true)
})
