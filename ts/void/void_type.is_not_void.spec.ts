import { testType, type IsNotVoid } from '../index.js'

it('returns false for void', () => {
	testType.false<IsNotVoid<void>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotVoid<any>>(true)
	testType.true<IsNotVoid<unknown>>(true)
	testType.true<IsNotVoid<never>>(true)
})

test('returns true for other types', () => {
	testType.true<IsNotVoid<undefined>>(true)
	testType.true<IsNotVoid<null>>(true)
	testType.true<IsNotVoid<number>>(true)
	testType.true<IsNotVoid<boolean>>(true)
	testType.true<IsNotVoid<true>>(true)
	testType.true<IsNotVoid<false>>(true)
	testType.true<IsNotVoid<string>>(true)
	testType.true<IsNotVoid<''>>(true)
	testType.true<IsNotVoid<symbol>>(true)
	testType.true<IsNotVoid<bigint>>(true)
	testType.true<IsNotVoid<{}>>(true)
	testType.true<IsNotVoid<string[]>>(true)
	testType.true<IsNotVoid<[]>>(true)
	testType.true<IsNotVoid<Function>>(true)
	testType.true<IsNotVoid<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotVoid<void | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotVoid<void & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotVoid<void, 1, 2>, 2>(true)
	testType.equal<IsNotVoid<0, 1, 2>, 1>(true)

	testType.equal<IsNotVoid<any, 1, 2>, 1>(true)
	testType.equal<IsNotVoid<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotVoid<never, 1, 2>, 1>(true)
})
