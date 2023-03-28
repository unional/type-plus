import { type, type AnyFunction, type IsFunction } from '../index.js'

it('returns true if T is Function', () => {
	type.true<IsFunction<Function>>(true)
})

it('returns true if T is function signature', () => {
	type.true<IsFunction<() => void>>(true)
	type.true<IsFunction<AnyFunction>>(true)
})

it('returns false for special types', () => {
	type.false<IsFunction<void>>(true)
	type.false<IsFunction<unknown>>(true)
	type.false<IsFunction<any>>(true)
	type.false<IsFunction<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsFunction<undefined>>(true)
	type.false<IsFunction<null>>(true)
	type.false<IsFunction<boolean>>(true)
	type.false<IsFunction<true>>(true)
	type.false<IsFunction<false>>(true)
	type.false<IsFunction<number>>(true)
	type.false<IsFunction<1>>(true)
	type.false<IsFunction<string>>(true)
	type.false<IsFunction<''>>(true)
	type.false<IsFunction<symbol>>(true)
	type.false<IsFunction<bigint>>(true)
	type.false<IsFunction<1n>>(true)
	type.false<IsFunction<{}>>(true)
	type.false<IsFunction<{ a: 1 }>>(true)
	type.false<IsFunction<string[]>>(true)
	type.false<IsFunction<[]>>(true)
})

it('returns false if T is union of function', () => {
	type.false<IsFunction<Function | { a: 1 }>>(true)
})

it('returns true if T is function overloads', () => {
	type.true<IsFunction<{ (): void; (x: number): number }>>(true)
})

it('returns true if T is intersection of function', () => {
	type.true<IsFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsFunction<Function, 1, 2>, 1>(true)

	type.equal<IsFunction<any, 1, 2>, 2>(true)
	type.equal<IsFunction<unknown, 1, 2>, 2>(true)
	type.equal<IsFunction<never, 1, 2>, 2>(true)
	type.equal<IsFunction<void, 1, 2>, 2>(true)
})
