import { testType, type AnyFunction, type IsStrictFunction } from '../index.js'

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

it('returns false if T is union of function', () => {
	testType.false<IsStrictFunction<Function | { a: 1 }>>(true)
})

it('returns false if T is function overloads', () => {
	testType.false<IsStrictFunction<{ (): void; (x: number): number }>>(true)
})

it('returns false if T is intersection of function', () => {
	testType.false<IsStrictFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsStrictFunction<Function, 1, 2>, 1>(true)
	testType.equal<IsStrictFunction<0, 1, 2>, 2>(true)

	testType.equal<IsStrictFunction<any, 1, 2>, 2>(true)
	testType.equal<IsStrictFunction<unknown, 1, 2>, 2>(true)
	testType.equal<IsStrictFunction<never, 1, 2>, 2>(true)
	testType.equal<IsStrictFunction<void, 1, 2>, 2>(true)
})
