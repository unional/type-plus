import { type, type IsNotStrictBigint } from '../index.js'

it('returns false for bigint', () => {
	type.false<IsNotStrictBigint<bigint>>(true)
})

it('returns true if T is bigint literals', () => {
	type.true<IsNotStrictBigint<0n>>(true)
	type.true<IsNotStrictBigint<1n>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotStrictBigint<any>>(true)
	type.true<IsNotStrictBigint<unknown>>(true)
	type.true<IsNotStrictBigint<void>>(true)
	type.true<IsNotStrictBigint<never>>(true)
})

test('returns true for other types', () => {
	type.true<IsNotStrictBigint<undefined>>(true)
	type.true<IsNotStrictBigint<null>>(true)
	type.true<IsNotStrictBigint<boolean>>(true)
	type.true<IsNotStrictBigint<true>>(true)
	type.true<IsNotStrictBigint<false>>(true)
	type.true<IsNotStrictBigint<number>>(true)
	type.true<IsNotStrictBigint<1>>(true)
	type.true<IsNotStrictBigint<string>>(true)
	type.true<IsNotStrictBigint<''>>(true)
	type.true<IsNotStrictBigint<symbol>>(true)
	type.true<IsNotStrictBigint<{}>>(true)
	type.true<IsNotStrictBigint<string[]>>(true)
	type.true<IsNotStrictBigint<[]>>(true)
	type.true<IsNotStrictBigint<Function>>(true)
	type.true<IsNotStrictBigint<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotStrictBigint<bigint | 1>>(true)
})

it('returns true for interaction type', () => {
	type.true<IsNotStrictBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotStrictBigint<bigint, 1, 2>, 2>(true)
	type.equal<IsNotStrictBigint<0n, 1, 2>, 1>(true)

	type.equal<IsNotStrictBigint<any, 1, 2>, 1>(true)
	type.equal<IsNotStrictBigint<unknown, 1, 2>, 1>(true)
	type.equal<IsNotStrictBigint<never, 1, 2>, 1>(true)
	type.equal<IsNotStrictBigint<void, 1, 2>, 1>(true)
})
