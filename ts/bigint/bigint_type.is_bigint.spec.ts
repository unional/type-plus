import { type, type IsBigint } from '../index.js'

it('returns true for bigint', () => {
	type.true<IsBigint<bigint>>(true)
})

it('returns false if T is bigint literals', () => {
	type.false<IsBigint<0n>>(true)
	type.false<IsBigint<1n>>(true)
})

it('returns false for special types', () => {
	type.false<IsBigint<any>>(true)
	type.false<IsBigint<unknown>>(true)
	type.false<IsBigint<void>>(true)
	type.false<IsBigint<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsBigint<undefined>>(true)
	type.false<IsBigint<null>>(true)
	type.false<IsBigint<boolean>>(true)
	type.false<IsBigint<true>>(true)
	type.false<IsBigint<false>>(true)
	type.false<IsBigint<number>>(true)
	type.false<IsBigint<1>>(true)
	type.false<IsBigint<string>>(true)
	type.false<IsBigint<''>>(true)
	type.false<IsBigint<symbol>>(true)
	type.false<IsBigint<{}>>(true)
	type.false<IsBigint<string[]>>(true)
	type.false<IsBigint<[]>>(true)
	type.false<IsBigint<Function>>(true)
	type.false<IsBigint<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsBigint<bigint | 1>>(true)
})

it('returns true for interaction type', () => {
	type.true<IsBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsBigint<bigint, 1, 2>, 1>(true)
	type.equal<IsBigint<0n, 1, 2>, 2>(true)

	type.equal<IsBigint<any, 1, 2>, 2>(true)
	type.equal<IsBigint<unknown, 1, 2>, 2>(true)
	type.equal<IsBigint<never, 1, 2>, 2>(true)
	type.equal<IsBigint<void, 1, 2>, 2>(true)
})
