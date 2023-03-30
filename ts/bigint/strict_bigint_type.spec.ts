import { type, type StrictBigintType } from '../index.js'

it('returns T if T is bigint', () => {
	type.equal<StrictBigintType<bigint>, bigint>(true)
})

it('returns never if T is bigint literals', () => {
	type.never<StrictBigintType<0n>>(true)
	type.never<StrictBigintType<11111111111111111111111111111111n>>(true)
})

it('returns never for special types', () => {
	type.never<StrictBigintType<any>>(true)
	type.never<StrictBigintType<unknown>>(true)
	type.never<StrictBigintType<void>>(true)
	type.never<StrictBigintType<never>>(true)
})

it('returns never for other types', () => {
	type.never<StrictBigintType<undefined>>(true)
	type.never<StrictBigintType<null>>(true)
	type.never<StrictBigintType<boolean>>(true)
	type.never<StrictBigintType<true>>(true)
	type.never<StrictBigintType<false>>(true)
	type.never<StrictBigintType<number>>(true)
	type.never<StrictBigintType<1>>(true)
	type.never<StrictBigintType<string>>(true)
	type.never<StrictBigintType<''>>(true)
	type.never<StrictBigintType<symbol>>(true)
	type.never<StrictBigintType<{}>>(true)
	type.never<StrictBigintType<string[]>>(true)
	type.never<StrictBigintType<[]>>(true)
	type.never<StrictBigintType<Function>>(true)
	type.never<StrictBigintType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<StrictBigintType<bigint | 1>>(true)
	type.never<StrictBigintType<bigint | 'a'>>(true)
})

it('returns never for intersection type', () => {
	type.never<StrictBigintType<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<StrictBigintType<bigint, 1, 2>, 1>(true)
	type.equal<StrictBigintType<1n, 1, 2>, 2>(true)

	type.equal<StrictBigintType<any, 1, 2>, 2>(true)
	type.equal<StrictBigintType<unknown, 1, 2>, 2>(true)
	type.equal<StrictBigintType<never, 1, 2>, 2>(true)
	type.equal<StrictBigintType<void, 1, 2>, 2>(true)
})
