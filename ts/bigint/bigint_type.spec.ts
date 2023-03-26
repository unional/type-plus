import { type, type BigintType } from '../index.js'

it('returns T if T is bigint', () => {
	type.equal<BigintType<bigint>, bigint>(true)
})

it('returns never if T is bigint literals', () => {
	type.never<BigintType<0n>>(true)
	type.never<BigintType<1n>>(true)
})

it('returns never for special types', () => {
	type.never<BigintType<any>>(true)
	type.never<BigintType<unknown>>(true)
	type.never<BigintType<void>>(true)
	type.never<BigintType<never>>(true)
})

test('returns never for other types', () => {
	type.never<BigintType<undefined>>(true)
	type.never<BigintType<null>>(true)
	type.never<BigintType<number>>(true)
	type.never<BigintType<boolean>>(true)
	type.never<BigintType<true>>(true)
	type.never<BigintType<false>>(true)
	type.never<BigintType<string>>(true)
	type.never<BigintType<''>>(true)
	type.never<BigintType<symbol>>(true)
	type.never<BigintType<{}>>(true)
	type.never<BigintType<string[]>>(true)
	type.never<BigintType<[]>>(true)
	type.never<BigintType<Function>>(true)
	type.never<BigintType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<BigintType<bigint | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<BigintType<bigint, 1, 2>, 1>(true)
	type.equal<BigintType<1n, 1, 2>, 2>(true)

	type.equal<BigintType<any, 1, 2>, 2>(true)
	type.equal<BigintType<unknown, 1, 2>, 2>(true)
	type.equal<BigintType<never, 1, 2>, 2>(true)
	type.equal<BigintType<void, 1, 2>, 2>(true)
})
