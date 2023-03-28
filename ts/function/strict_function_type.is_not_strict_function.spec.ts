import { type, type AnyFunction, type IsNotStrictFunction } from '../index.js'

it('returns false if T is Function', () => {
	type.false<IsNotStrictFunction<Function>>(true)
})

it('returns true if T is function signature', () => {
	type.true<IsNotStrictFunction<() => void>>(true)
	type.true<IsNotStrictFunction<AnyFunction>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotStrictFunction<void>>(true)
	type.true<IsNotStrictFunction<unknown>>(true)
	type.true<IsNotStrictFunction<any>>(true)
	type.true<IsNotStrictFunction<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotStrictFunction<undefined>>(true)
	type.true<IsNotStrictFunction<null>>(true)
	type.true<IsNotStrictFunction<boolean>>(true)
	type.true<IsNotStrictFunction<true>>(true)
	type.true<IsNotStrictFunction<false>>(true)
	type.true<IsNotStrictFunction<number>>(true)
	type.true<IsNotStrictFunction<1>>(true)
	type.true<IsNotStrictFunction<string>>(true)
	type.true<IsNotStrictFunction<''>>(true)
	type.true<IsNotStrictFunction<symbol>>(true)
	type.true<IsNotStrictFunction<bigint>>(true)
	type.true<IsNotStrictFunction<1n>>(true)
	type.true<IsNotStrictFunction<{}>>(true)
	type.true<IsNotStrictFunction<{ a: 1 }>>(true)
	type.true<IsNotStrictFunction<string[]>>(true)
	type.true<IsNotStrictFunction<[]>>(true)
})

it('returns true if T is union of function and other types', () => {
	type.true<IsNotStrictFunction<Function | { a: 1 }>>(true)
})

it('returns true if T is function overloads', () => {
	type.true<IsNotStrictFunction<{ (): void; (x: number): number }>>(true)
})

it('returns true if T is intersection of function', () => {
	type.true<IsNotStrictFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotStrictFunction<Function, 1, 2>, 2>(true)
	type.equal<IsNotStrictFunction<{}, 1, 2>, 1>(true)

	type.equal<IsNotStrictFunction<any, 1, 2>, 1>(true)
	type.equal<IsNotStrictFunction<unknown, 1, 2>, 1>(true)
	type.equal<IsNotStrictFunction<never, 1, 2>, 1>(true)
	type.equal<IsNotStrictFunction<void, 1, 2>, 1>(true)
})
