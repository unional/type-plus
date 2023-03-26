import { type, type IsNotBigint } from '../index.js'

it('returns false for bigint', () => {
	type.false<IsNotBigint<bigint>>(true)
})

it('returns true if T is bigint literals', () => {
	type.true<IsNotBigint<0n>>(true)
	type.true<IsNotBigint<1n>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotBigint<any>>(true)
	type.true<IsNotBigint<unknown>>(true)
	type.true<IsNotBigint<void>>(true)
	type.true<IsNotBigint<never>>(true)
})

test('returns true for other types', () => {
	type.true<IsNotBigint<undefined>>(true)
	type.true<IsNotBigint<null>>(true)
	type.true<IsNotBigint<boolean>>(true)
	type.true<IsNotBigint<true>>(true)
	type.true<IsNotBigint<false>>(true)
	type.true<IsNotBigint<number>>(true)
	type.true<IsNotBigint<1>>(true)
	type.true<IsNotBigint<string>>(true)
	type.true<IsNotBigint<''>>(true)
	type.true<IsNotBigint<symbol>>(true)
	type.true<IsNotBigint<{}>>(true)
	type.true<IsNotBigint<string[]>>(true)
	type.true<IsNotBigint<[]>>(true)
	type.true<IsNotBigint<Function>>(true)
	type.true<IsNotBigint<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotBigint<bigint | 1>>(true)
})

it('returns true for interaction type', () => {
	type.true<IsNotBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotBigint<bigint, 1, 2>, 2>(true)
	type.equal<IsNotBigint<0n, 1, 2>, 1>(true)

	type.equal<IsNotBigint<any, 1, 2>, 1>(true)
	type.equal<IsNotBigint<unknown, 1, 2>, 1>(true)
	type.equal<IsNotBigint<never, 1, 2>, 1>(true)
	type.equal<IsNotBigint<void, 1, 2>, 1>(true)
})
