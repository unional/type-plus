import { it } from '@jest/globals'
import { testType, type $Else, type $SelectionBranch, type $Then, type IsAny } from '../index.js'

it('returns true for any', () => {
	testType.equal<IsAny<any>, true>(true)
})

it('returns false for other special types', () => {
	testType.false<IsAny<unknown>>(true)
	testType.false<IsAny<void>>(true)
	testType.false<IsAny<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsAny<undefined>>(true)
	testType.false<IsAny<null>>(true)
	testType.false<IsAny<boolean>>(true)
	testType.false<IsAny<true>>(true)
	testType.false<IsAny<never>>(true)
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
	testType.equal<any | 1, any>(true)
	testType.true<IsAny<any | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.true<IsAny<any & 1>>(true)
})

it('as branching', () => {
	testType.equal<IsAny<any, $SelectionBranch>, $Then>(true)
	testType.equal<IsAny<0, $SelectionBranch>, $Else>(true)

	testType.equal<IsAny<unknown, $SelectionBranch>, $Else>(true)
	testType.equal<IsAny<never, $SelectionBranch>, $Else>(true)
	testType.equal<IsAny<void, $SelectionBranch>, $Else>(true)
})
