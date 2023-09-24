import { it } from '@jest/globals'
import { testType, type $Else, type $SelectionBranch, type $Then, type IsUnknown } from '../index.js'

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

it('returns true for union type as unknown | <others> => unknown', () => {
	testType.equal<unknown | 1, unknown>(true)
	testType.true<IsUnknown<unknown | 1>>(true)
})

it('returns false as unknown & any => any', () => {
	testType.equal<unknown & any, any>(true)
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

it('works as filter', () => {
	testType.equal<IsUnknown<unknown, { selection: 'filter' }>, unknown>(true)

	testType.equal<IsUnknown<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnknown<undefined, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnknown<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsUnknown<string | unknown, { selection: 'filter' }>, unknown>(true)

	testType.equal<IsUnknown<string | boolean, { selection: 'filter-unknown' }>, unknown>(true)
})

it('works with unique branches', () => {
	testType.equal<IsUnknown<unknown, $SelectionBranch>, $Then>(true)
	testType.equal<IsUnknown<number, $SelectionBranch>, $Else>(true)

	testType.equal<IsUnknown<any, $SelectionBranch>, $Else>(true)
	testType.equal<IsUnknown<never, $SelectionBranch>, $Else>(true)
	testType.equal<IsUnknown<void, $SelectionBranch>, $Else>(true)
})
