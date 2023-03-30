import { type, type IsStrictBigint } from '../index.js'

it('returns true for bigint', () => {
	type.true<IsStrictBigint<bigint>>(true)
})

it('returns false if T is bigint literals', () => {
	type.false<IsStrictBigint<0n>>(true)
	type.false<IsStrictBigint<1n>>(true)
})

it('returns false for special types', () => {
	type.false<IsStrictBigint<any>>(true)
	type.false<IsStrictBigint<unknown>>(true)
	type.false<IsStrictBigint<void>>(true)
	type.false<IsStrictBigint<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsStrictBigint<undefined>>(true)
	type.false<IsStrictBigint<null>>(true)
	type.false<IsStrictBigint<boolean>>(true)
	type.false<IsStrictBigint<true>>(true)
	type.false<IsStrictBigint<false>>(true)
	type.false<IsStrictBigint<number>>(true)
	type.false<IsStrictBigint<1>>(true)
	type.false<IsStrictBigint<string>>(true)
	type.false<IsStrictBigint<''>>(true)
	type.false<IsStrictBigint<symbol>>(true)
	type.false<IsStrictBigint<{}>>(true)
	type.false<IsStrictBigint<string[]>>(true)
	type.false<IsStrictBigint<[]>>(true)
	type.false<IsStrictBigint<Function>>(true)
	type.false<IsStrictBigint<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsStrictBigint<bigint | 1>>(true)
})

it('returns false for interaction type', () => {
	type.false<IsStrictBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsStrictBigint<bigint, 1, 2>, 1>(true)
	type.equal<IsStrictBigint<0n, 1, 2>, 2>(true)

	type.equal<IsStrictBigint<any, 1, 2>, 2>(true)
	type.equal<IsStrictBigint<unknown, 1, 2>, 2>(true)
	type.equal<IsStrictBigint<never, 1, 2>, 2>(true)
	type.equal<IsStrictBigint<void, 1, 2>, 2>(true)
})
