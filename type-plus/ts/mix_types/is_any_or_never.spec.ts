import { it } from '@jest/globals'
import { testType, type IsAnyOrNever } from '../index.js'

it('returns true for any', () => {
	testType.equal<IsAnyOrNever<any>, true>(true)
})

it('returns true for never', () => {
	testType.equal<IsAnyOrNever<never>, true>(true)
})

it('returns false for other special types', () => {
	testType.false<IsAnyOrNever<unknown>>(true)
	testType.false<IsAnyOrNever<void>>(true)
})

it('returns never for other types', () => {
	testType.false<IsAnyOrNever<undefined>>(true)
	testType.false<IsAnyOrNever<null>>(true)
	testType.false<IsAnyOrNever<boolean>>(true)
	testType.false<IsAnyOrNever<true>>(true)
	testType.false<IsAnyOrNever<false>>(true)
	testType.false<IsAnyOrNever<number>>(true)
	testType.false<IsAnyOrNever<1>>(true)
	testType.false<IsAnyOrNever<string>>(true)
	testType.false<IsAnyOrNever<''>>(true)
	testType.false<IsAnyOrNever<symbol>>(true)
	testType.false<IsAnyOrNever<bigint>>(true)
	testType.false<IsAnyOrNever<1n>>(true)
	testType.false<IsAnyOrNever<{}>>(true)
	testType.false<IsAnyOrNever<{ a: 1 }>>(true)
	testType.false<IsAnyOrNever<string[]>>(true)
	testType.false<IsAnyOrNever<[]>>(true)
	testType.false<IsAnyOrNever<Function>>(true)
	testType.false<IsAnyOrNever<() => void>>(true)
})

it('returns true for `any | 1` because that is resolved to `any` by TypeScript', () => {
	testType.equal<any | 1, any>(true)
	testType.true<IsAnyOrNever<any | 1>>(true)
})

it('returns false for `never | 1` because that is resolved to `1` by TypeScript', () => {
	testType.equal<never | 1, 1>(true)
	testType.false<IsAnyOrNever<never | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.true<IsAnyOrNever<any & 1>>(true)

	testType.equal<never & 1, never>(true)
	testType.true<IsAnyOrNever<never & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsAnyOrNever<any, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<IsAnyOrNever<never, { $then: 1, $else: 2 }>, 1>(true)

	testType.equal<IsAnyOrNever<0, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsAnyOrNever<unknown, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsAnyOrNever<void, { $then: 1, $else: 2 }>, 2>(true)
})
