import { type, type AnyFunction, type IsStrictFunction } from '../index.js'

it('returns true if T is Function', () => {
	type.true<IsStrictFunction<Function>>(true)
})

it('returns false if T is function signature', () => {
	type.false<IsStrictFunction<() => void>>(true)
	type.false<IsStrictFunction<AnyFunction>>(true)
})

it('returns false for special types', () => {
	type.false<IsStrictFunction<void>>(true)
	type.false<IsStrictFunction<unknown>>(true)
	type.false<IsStrictFunction<any>>(true)
	type.false<IsStrictFunction<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsStrictFunction<undefined>>(true)
	type.false<IsStrictFunction<null>>(true)
	type.false<IsStrictFunction<boolean>>(true)
	type.false<IsStrictFunction<true>>(true)
	type.false<IsStrictFunction<false>>(true)
	type.false<IsStrictFunction<number>>(true)
	type.false<IsStrictFunction<1>>(true)
	type.false<IsStrictFunction<string>>(true)
	type.false<IsStrictFunction<''>>(true)
	type.false<IsStrictFunction<symbol>>(true)
	type.false<IsStrictFunction<bigint>>(true)
	type.false<IsStrictFunction<1n>>(true)
	type.false<IsStrictFunction<{}>>(true)
	type.false<IsStrictFunction<{ a: 1 }>>(true)
	type.false<IsStrictFunction<string[]>>(true)
	type.false<IsStrictFunction<[]>>(true)
})

it('returns false if T is union of function', () => {
	type.false<IsStrictFunction<Function | { a: 1 }>>(true)
})

it('returns false if T is function overloads', () => {
	type.false<IsStrictFunction<{ (): void; (x: number): number }>>(true)
})

it('returns false if T is intersection of function', () => {
	type.false<IsStrictFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsStrictFunction<Function, 1, 2>, 1>(true)
	type.equal<IsStrictFunction<0, 1, 2>, 2>(true)

	type.equal<IsStrictFunction<any, 1, 2>, 2>(true)
	type.equal<IsStrictFunction<unknown, 1, 2>, 2>(true)
	type.equal<IsStrictFunction<never, 1, 2>, 2>(true)
	type.equal<IsStrictFunction<void, 1, 2>, 2>(true)
})
