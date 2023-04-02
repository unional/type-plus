import { testType, type IsNotUndefined } from '../index.js'

it('returns false for undefined', () => {
	testType.false<IsNotUndefined<undefined>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotUndefined<any>>(true)
	testType.true<IsNotUndefined<unknown>>(true)
	testType.true<IsNotUndefined<void>>(true)
	testType.true<IsNotUndefined<never>>(true)
})

test('returns true for singular types', () => {
	testType.true<IsNotUndefined<null>>(true)
	testType.true<IsNotUndefined<number>>(true)
	testType.true<IsNotUndefined<boolean>>(true)
	testType.true<IsNotUndefined<true>>(true)
	testType.true<IsNotUndefined<false>>(true)
	testType.true<IsNotUndefined<string>>(true)
	testType.true<IsNotUndefined<''>>(true)
	testType.true<IsNotUndefined<symbol>>(true)
	testType.true<IsNotUndefined<bigint>>(true)
	testType.true<IsNotUndefined<{}>>(true)
	testType.true<IsNotUndefined<string[]>>(true)
	testType.true<IsNotUndefined<[]>>(true)
	testType.true<IsNotUndefined<Function>>(true)
	testType.true<IsNotUndefined<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotUndefined<undefined | 1>>(true)
})

it('returns true as undefined & any => any', () => {
	testType.true<IsNotUndefined<undefined & any>>(true)
})

it('returns false as undefined & unknown => undefined', () => {
	testType.false<IsNotUndefined<undefined & unknown>>(true)
})

it('returns false as undefined & void => undefined', () => {
	testType.false<IsNotUndefined<undefined & void>>(true)
})

it('returns true as undefined & never => never', () => {
	testType.true<IsNotUndefined<undefined & never>>(true)
})

it('returns true as undefined & <others> => never', () => {
	testType.true<IsNotUndefined<undefined & null>>(true)
	testType.true<IsNotUndefined<undefined & number>>(true)
	testType.true<IsNotUndefined<undefined & 1>>(true)
	testType.true<IsNotUndefined<undefined & boolean>>(true)
	testType.true<IsNotUndefined<undefined & true>>(true)
	testType.true<IsNotUndefined<undefined & false>>(true)
	testType.true<IsNotUndefined<undefined & string>>(true)
	testType.true<IsNotUndefined<undefined & ''>>(true)
	testType.true<IsNotUndefined<undefined & symbol>>(true)
	testType.true<IsNotUndefined<undefined & bigint>>(true)
	testType.true<IsNotUndefined<undefined & 1n>>(true)
	testType.true<IsNotUndefined<undefined & {}>>(true)
	testType.true<IsNotUndefined<undefined & { a: 1 }>>(true)
	testType.true<IsNotUndefined<undefined & string[]>>(true)
	testType.true<IsNotUndefined<undefined & []>>(true)
	testType.true<IsNotUndefined<undefined & Function>>(true)
	testType.true<IsNotUndefined<undefined & (() => void)>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotUndefined<undefined, 1, 2>, 2>(true)

	testType.equal<IsNotUndefined<any, 1, 2>, 1>(true)
	testType.equal<IsNotUndefined<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotUndefined<never, 1, 2>, 1>(true)
	testType.equal<IsNotUndefined<void, 1, 2>, 1>(true)
})
