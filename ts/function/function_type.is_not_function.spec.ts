import { testType, type AnyFunction, type IsNotFunction } from '../index.js'

it('returns false if T is Function', () => {
	testType.false<IsNotFunction<Function>>(true)
})

it('returns false if T is function signature', () => {
	testType.false<IsNotFunction<() => void>>(true)
	testType.false<IsNotFunction<AnyFunction>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotFunction<void>>(true)
	testType.true<IsNotFunction<unknown>>(true)
	testType.true<IsNotFunction<any>>(true)
	testType.true<IsNotFunction<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotFunction<undefined>>(true)
	testType.true<IsNotFunction<null>>(true)
	testType.true<IsNotFunction<boolean>>(true)
	testType.true<IsNotFunction<true>>(true)
	testType.true<IsNotFunction<false>>(true)
	testType.true<IsNotFunction<number>>(true)
	testType.true<IsNotFunction<1>>(true)
	testType.true<IsNotFunction<string>>(true)
	testType.true<IsNotFunction<''>>(true)
	testType.true<IsNotFunction<symbol>>(true)
	testType.true<IsNotFunction<bigint>>(true)
	testType.true<IsNotFunction<1n>>(true)
	testType.true<IsNotFunction<{}>>(true)
	testType.true<IsNotFunction<{ a: 1 }>>(true)
	testType.true<IsNotFunction<string[]>>(true)
	testType.true<IsNotFunction<[]>>(true)
})

it('returns true if T is union of function and other types', () => {
	testType.true<IsNotFunction<Function | { a: 1 }>>(true)
})

it('returns false if T is function overloads', () => {
	testType.false<IsNotFunction<{ (): void; (x: number): number }>>(true)
})

it('returns false if T is intersection of function', () => {
	testType.false<IsNotFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotFunction<Function, 1, 2>, 2>(true)
	testType.equal<IsNotFunction<{}, 1, 2>, 1>(true)

	testType.equal<IsNotFunction<any, 1, 2>, 1>(true)
	testType.equal<IsNotFunction<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotFunction<never, 1, 2>, 1>(true)
	testType.equal<IsNotFunction<void, 1, 2>, 1>(true)
})
