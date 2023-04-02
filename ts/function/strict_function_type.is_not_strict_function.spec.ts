import { testType, type AnyFunction, type IsNotStrictFunction } from '../index.js'

it('returns false if T is Function', () => {
	testType.false<IsNotStrictFunction<Function>>(true)
})

it('returns true if T is function signature', () => {
	testType.true<IsNotStrictFunction<() => void>>(true)
	testType.true<IsNotStrictFunction<AnyFunction>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictFunction<void>>(true)
	testType.true<IsNotStrictFunction<unknown>>(true)
	testType.true<IsNotStrictFunction<any>>(true)
	testType.true<IsNotStrictFunction<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictFunction<undefined>>(true)
	testType.true<IsNotStrictFunction<null>>(true)
	testType.true<IsNotStrictFunction<boolean>>(true)
	testType.true<IsNotStrictFunction<true>>(true)
	testType.true<IsNotStrictFunction<false>>(true)
	testType.true<IsNotStrictFunction<number>>(true)
	testType.true<IsNotStrictFunction<1>>(true)
	testType.true<IsNotStrictFunction<string>>(true)
	testType.true<IsNotStrictFunction<''>>(true)
	testType.true<IsNotStrictFunction<symbol>>(true)
	testType.true<IsNotStrictFunction<bigint>>(true)
	testType.true<IsNotStrictFunction<1n>>(true)
	testType.true<IsNotStrictFunction<{}>>(true)
	testType.true<IsNotStrictFunction<{ a: 1 }>>(true)
	testType.true<IsNotStrictFunction<string[]>>(true)
	testType.true<IsNotStrictFunction<[]>>(true)
})

it('returns true if T is union of function and other types', () => {
	testType.true<IsNotStrictFunction<Function | { a: 1 }>>(true)
})

it('returns true if T is function overloads', () => {
	testType.true<IsNotStrictFunction<{ (): void; (x: number): number }>>(true)
})

it('returns true if T is intersection of function', () => {
	testType.true<IsNotStrictFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotStrictFunction<Function, 1, 2>, 2>(true)
	testType.equal<IsNotStrictFunction<{}, 1, 2>, 1>(true)

	testType.equal<IsNotStrictFunction<any, 1, 2>, 1>(true)
	testType.equal<IsNotStrictFunction<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotStrictFunction<never, 1, 2>, 1>(true)
	testType.equal<IsNotStrictFunction<void, 1, 2>, 1>(true)
})
