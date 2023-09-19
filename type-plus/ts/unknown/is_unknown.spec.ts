import { it } from '@jest/globals'
import { testType, type IsUnknown } from '../index.js'

it('returns true for unknown', () => {
	testType.true<IsUnknown<unknown>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsUnknown<any>>(true)
	testType.false<IsUnknown<void>>(true)
	testType.false<IsUnknown<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsUnknown<null>>(true)
	testType.false<IsUnknown<number>>(true)
	testType.false<IsUnknown<boolean>>(true)
	testType.false<IsUnknown<true>>(true)
	testType.false<IsUnknown<false>>(true)
	testType.false<IsUnknown<string>>(true)
	testType.false<IsUnknown<''>>(true)
	testType.false<IsUnknown<symbol>>(true)
	testType.false<IsUnknown<bigint>>(true)
	testType.false<IsUnknown<{}>>(true)
	testType.false<IsUnknown<string[]>>(true)
	testType.false<IsUnknown<[]>>(true)
	testType.false<IsUnknown<Function>>(true)
	testType.false<IsUnknown<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsUnknown<undefined | 1>>(true)
})

it('returns false as unknown & any => any', () => {
	testType.false<IsUnknown<unknown & any>>(true)
})

it('returns true as unknown & void => void', () => {
	testType.false<IsUnknown<unknown & void>>(true)
})

it('returns false as unknown & never => never', () => {
	testType.false<IsUnknown<unknown & never>>(true)
})

it('returns false as unknown & <others> => <other>', () => {
	testType.false<IsUnknown<unknown & null>>(true)
	testType.false<IsUnknown<unknown & number>>(true)
	testType.false<IsUnknown<unknown & 1>>(true)
	testType.false<IsUnknown<unknown & boolean>>(true)
	testType.false<IsUnknown<unknown & true>>(true)
	testType.false<IsUnknown<unknown & false>>(true)
	testType.false<IsUnknown<unknown & string>>(true)
	testType.false<IsUnknown<unknown & ''>>(true)
	testType.false<IsUnknown<unknown & symbol>>(true)
	testType.false<IsUnknown<unknown & bigint>>(true)
	testType.false<IsUnknown<unknown & 1n>>(true)
	testType.false<IsUnknown<unknown & {}>>(true)
	testType.false<IsUnknown<unknown & { a: 1 }>>(true)
	testType.false<IsUnknown<unknown & string[]>>(true)
	testType.false<IsUnknown<unknown & []>>(true)
	testType.false<IsUnknown<unknown & Function>>(true)
	testType.false<IsUnknown<unknown & (() => void)>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsUnknown<unknown, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<IsUnknown<number, { $then: 1, $else: 2 }>, 2>(true)

	testType.equal<IsUnknown<any, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsUnknown<never, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsUnknown<void, { $then: 1, $else: 2 }>, 2>(true)
})
