import { type, type AnyFunction, type IsNotFunction } from '../index.js'

it('returns false if T is Function', () => {
	type.false<IsNotFunction<Function>>(true)
})

it('returns false if T is function signature', () => {
	type.false<IsNotFunction<() => void>>(true)
	type.false<IsNotFunction<AnyFunction>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotFunction<void>>(true)
	type.true<IsNotFunction<unknown>>(true)
	type.true<IsNotFunction<any>>(true)
	type.true<IsNotFunction<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotFunction<undefined>>(true)
	type.true<IsNotFunction<null>>(true)
	type.true<IsNotFunction<boolean>>(true)
	type.true<IsNotFunction<true>>(true)
	type.true<IsNotFunction<false>>(true)
	type.true<IsNotFunction<number>>(true)
	type.true<IsNotFunction<1>>(true)
	type.true<IsNotFunction<string>>(true)
	type.true<IsNotFunction<''>>(true)
	type.true<IsNotFunction<symbol>>(true)
	type.true<IsNotFunction<bigint>>(true)
	type.true<IsNotFunction<{}>>(true)
	type.true<IsNotFunction<string[]>>(true)
	type.true<IsNotFunction<[]>>(true)
})

it('returns boolean if T is union of function', () => {
	// because the union type are distributed so `() => void` returns false,
	// while `{ a: 1 }` returns true
	// thus the result is `false | true` -> `boolean`.
	type.boolean<IsNotFunction<(() => void) | { a: 1 }>>(true)
})

it('returns false if T is function overloads', () => {
	type.false<IsNotFunction<{ (): void; (x: number): number }>>(true)
})

it('returns false if T is intersection of function', () => {
	type.false<IsNotFunction<(() => void) & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotFunction<Function, 1, 2>, 2>(true)
	type.equal<IsNotFunction<{}, 1, 2>, 1>(true)

	type.equal<IsNotFunction<any, 1, 2>, 1>(true)
	type.equal<IsNotFunction<unknown, 1, 2>, 1>(true)
	type.equal<IsNotFunction<never, 1, 2>, 1>(true)
	type.equal<IsNotFunction<void, 1, 2>, 1>(true)
})
