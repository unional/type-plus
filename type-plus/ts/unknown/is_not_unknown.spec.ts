import { it } from '@jest/globals'
import { testType, type $Any, type $BranchOptions, type $Else, type $Never, type $SelectionBranch, type $Then, type IsNotUnknown } from '../index.js'

it('returns false for unknown', () => {
	testType.false<IsNotUnknown<unknown>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotUnknown<any>>(true)
	testType.true<IsNotUnknown<void>>(true)
	testType.true<IsNotUnknown<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotUnknown<null>>(true)
	testType.true<IsNotUnknown<number>>(true)
	testType.true<IsNotUnknown<boolean>>(true)
	testType.true<IsNotUnknown<true>>(true)
	testType.true<IsNotUnknown<false>>(true)
	testType.true<IsNotUnknown<string>>(true)
	testType.true<IsNotUnknown<''>>(true)
	testType.true<IsNotUnknown<symbol>>(true)
	testType.true<IsNotUnknown<bigint>>(true)
	testType.true<IsNotUnknown<{}>>(true)
	testType.true<IsNotUnknown<string[]>>(true)
	testType.true<IsNotUnknown<[]>>(true)
	testType.true<IsNotUnknown<Function>>(true)
	testType.true<IsNotUnknown<() => void>>(true)
})

it('returns false for union type as unknown | <others> => unknown', () => {
	testType.equal<unknown | 1, unknown>(true)
	testType.false<IsNotUnknown<unknown | 1>>(true)
})

it('returns true as unknown & any => any', () => {
	testType.equal<unknown & any, any>(true)
	testType.true<IsNotUnknown<unknown & any>>(true)
})

it('returns false as unknown & void => void', () => {
	testType.equal<unknown & void, void>(true)
	testType.true<IsNotUnknown<unknown & void>>(true)
})

it('returns true as unknown & never => never', () => {
	testType.equal<unknown & never, never>(true)
	testType.true<IsNotUnknown<unknown & never>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<unknown & { a: 1 }, { a: 1 }>(true)
	testType.true<IsNotUnknown<unknown & { a: 1 }>>(true)
})

it('returns true as unknown & <others> => <others>', () => {
	testType.true<IsNotUnknown<unknown & null>>(true)
	testType.true<IsNotUnknown<unknown & number>>(true)
	testType.true<IsNotUnknown<unknown & 1>>(true)
	testType.true<IsNotUnknown<unknown & boolean>>(true)
	testType.true<IsNotUnknown<unknown & true>>(true)
	testType.true<IsNotUnknown<unknown & false>>(true)
	testType.true<IsNotUnknown<unknown & string>>(true)
	testType.true<IsNotUnknown<unknown & ''>>(true)
	testType.true<IsNotUnknown<unknown & symbol>>(true)
	testType.true<IsNotUnknown<unknown & bigint>>(true)
	testType.true<IsNotUnknown<unknown & 1n>>(true)
	testType.true<IsNotUnknown<unknown & {}>>(true)
	testType.true<IsNotUnknown<unknown & { a: 1 }>>(true)
	testType.true<IsNotUnknown<unknown & string[]>>(true)
	testType.true<IsNotUnknown<unknown & []>>(true)
	testType.true<IsNotUnknown<unknown & Function>>(true)
	testType.true<IsNotUnknown<unknown & (() => void)>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotUnknown<unknown, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotUnknown<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotUnknown<undefined, { selection: 'filter' }>, undefined>(true)
	testType.equal<IsNotUnknown<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotUnknown<string | unknown, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotUnknown<unknown, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsNotUnknown<number, $BranchOptions<$Then | $Else>>, $Then>(true)

	testType.equal<IsNotUnknown<any, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNotUnknown<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsNotUnknown<any, $BranchOptions<$Any | $Then>>, $Any>(true)

	testType.equal<IsNotUnknown<never, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNotUnknown<never, $BranchOptions<$Never>>, $Never>(true)
	testType.equal<IsNotUnknown<never, $BranchOptions<$Never | $Then>>, $Never>(true)

	testType.equal<IsNotUnknown<void, $SelectionBranch>, $Then>(true)
})
