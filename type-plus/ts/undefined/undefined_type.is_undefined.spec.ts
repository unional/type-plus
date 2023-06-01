import { it } from '@jest/globals'
import { testType, type IsUndefined } from '../index.js'

it('returns true for undefined', () => {
	testType.true<IsUndefined<undefined>>(true)
})

it('returns false for special types', () => {
	testType.false<IsUndefined<any>>(true)
	testType.false<IsUndefined<unknown>>(true)
	testType.false<IsUndefined<void>>(true)
	testType.false<IsUndefined<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsUndefined<null>>(true)
	testType.false<IsUndefined<number>>(true)
	testType.false<IsUndefined<boolean>>(true)
	testType.false<IsUndefined<true>>(true)
	testType.false<IsUndefined<false>>(true)
	testType.false<IsUndefined<string>>(true)
	testType.false<IsUndefined<''>>(true)
	testType.false<IsUndefined<symbol>>(true)
	testType.false<IsUndefined<bigint>>(true)
	testType.false<IsUndefined<{}>>(true)
	testType.false<IsUndefined<string[]>>(true)
	testType.false<IsUndefined<[]>>(true)
	testType.false<IsUndefined<Function>>(true)
	testType.false<IsUndefined<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsUndefined<undefined | 1>>(true)
})

it('returns false as undefined & any => any', () => {
	testType.false<IsUndefined<undefined & any>>(true)
})

it('returns true as undefined & unknown => undefined', () => {
	testType.true<IsUndefined<undefined & unknown>>(true)
})

it('returns true as undefined & void => undefined', () => {
	testType.true<IsUndefined<undefined & void>>(true)
})

it('returns false as undefined & never => never', () => {
	testType.false<IsUndefined<undefined & never>>(true)
})

it('returns false as undefined & <others> => never', () => {
	testType.false<IsUndefined<undefined & null>>(true)
	testType.false<IsUndefined<undefined & number>>(true)
	testType.false<IsUndefined<undefined & 1>>(true)
	testType.false<IsUndefined<undefined & boolean>>(true)
	testType.false<IsUndefined<undefined & true>>(true)
	testType.false<IsUndefined<undefined & false>>(true)
	testType.false<IsUndefined<undefined & string>>(true)
	testType.false<IsUndefined<undefined & ''>>(true)
	testType.false<IsUndefined<undefined & symbol>>(true)
	testType.false<IsUndefined<undefined & bigint>>(true)
	testType.false<IsUndefined<undefined & 1n>>(true)
	testType.false<IsUndefined<undefined & {}>>(true)
	testType.false<IsUndefined<undefined & { a: 1 }>>(true)
	testType.false<IsUndefined<undefined & string[]>>(true)
	testType.false<IsUndefined<undefined & []>>(true)
	testType.false<IsUndefined<undefined & Function>>(true)
	testType.false<IsUndefined<undefined & (() => void)>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsUndefined<undefined, 1, 2>, 1>(true)
	testType.equal<IsUndefined<any, 1, 2>, 2>(true)
	testType.equal<IsUndefined<unknown, 1, 2>, 2>(true)
	testType.equal<IsUndefined<never, 1, 2>, 2>(true)
	testType.equal<IsUndefined<void, 1, 2>, 2>(true)
})
