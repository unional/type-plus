import { it } from '@jest/globals'
import { testType, type AnyFunction, type IsStrictFunction, type $Then, type $Else } from '../index.js'

it('returns true if T is Function', () => {
	testType.true<IsStrictFunction<Function>>(true)
})

it('returns false if T is function signature', () => {
	testType.false<IsStrictFunction<() => void>>(true)
	testType.false<IsStrictFunction<AnyFunction>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictFunction<void>>(true)
	testType.false<IsStrictFunction<unknown>>(true)
	testType.false<IsStrictFunction<any>>(true)
	testType.false<IsStrictFunction<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsStrictFunction<undefined>>(true)
	testType.false<IsStrictFunction<null>>(true)
	testType.false<IsStrictFunction<boolean>>(true)
	testType.false<IsStrictFunction<true>>(true)
	testType.false<IsStrictFunction<false>>(true)
	testType.false<IsStrictFunction<number>>(true)
	testType.false<IsStrictFunction<1>>(true)
	testType.false<IsStrictFunction<string>>(true)
	testType.false<IsStrictFunction<''>>(true)
	testType.false<IsStrictFunction<symbol>>(true)
	testType.false<IsStrictFunction<bigint>>(true)
	testType.false<IsStrictFunction<1n>>(true)
	testType.false<IsStrictFunction<{}>>(true)
	testType.false<IsStrictFunction<{ a: 1 }>>(true)
	testType.false<IsStrictFunction<string[]>>(true)
	testType.false<IsStrictFunction<[]>>(true)
})

it('distributes over union type', () => {
	testType.equal<Function | { a: 1 }, Function | { a: 1 }>(true)
	testType.equal<IsStrictFunction<Function | { a: 1 }>, boolean>(true)
	testType.equal<IsStrictFunction<(() => void) | { a: 1 }>, false>(true)
})

it('returns false if T is function overloads', () => {
	testType.false<IsStrictFunction<{ (): void, (x: number): number }>>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictFunction<Function | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsStrictFunction<Function & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictFunction<Function, { selection: 'filter' }>, Function>(true)
	testType.equal<IsStrictFunction<() => void, { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictFunction<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictFunction<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictFunction<Function | number, { selection: 'filter' }>, Function>(true)
	testType.equal<IsStrictFunction<Function | number, { selection: 'filter', distributive: false }>, never>(true)

	testType.equal<IsStrictFunction<Function | true, { selection: 'filter' }>, Function>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictFunction<Function, IsStrictFunction.$Branch>, $Then>(true)
	testType.equal<IsStrictFunction<() => void, IsStrictFunction.$Branch>, $Else>(true)

	testType.equal<IsStrictFunction<any, IsStrictFunction.$Branch>, $Else>(true)
	testType.equal<IsStrictFunction<unknown, IsStrictFunction.$Branch>, $Else>(true)
	testType.equal<IsStrictFunction<never, IsStrictFunction.$Branch>, $Else>(true)
	testType.equal<IsStrictFunction<void, IsStrictFunction.$Branch>, $Else>(true)
})
