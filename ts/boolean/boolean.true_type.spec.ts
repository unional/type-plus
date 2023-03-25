import { TrueType, PrimitiveTypes, type } from '../index.js'

it('returns T if T is true', () => {
	type.equal<TrueType<true>, true>(true)
})

it('returns never if T is boolean or false', () => {
	type.never<TrueType<boolean>>(true)
	type.never<TrueType<false>>(true)
})

it('returns never for special types', () => {
	type.never<TrueType<void>>(true)
	type.never<TrueType<unknown>>(true)
	type.never<TrueType<any>>(true)
	type.never<TrueType<never>>(true)
})

it('returns never for all other types', () => {
	type.never<TrueType<undefined>>(true)
	type.never<TrueType<null>>(true)
	type.never<TrueType<number>>(true)
	type.never<TrueType<1>>(true)
	type.never<TrueType<boolean>>(true)
	type.never<TrueType<false>>(true)
	type.never<TrueType<string>>(true)
	type.never<TrueType<''>>(true)
	type.never<TrueType<symbol>>(true)
	type.never<TrueType<bigint>>(true)
	type.never<TrueType<{}>>(true)
	type.never<TrueType<string[]>>(true)
	type.never<TrueType<[]>>(true)
	type.never<TrueType<Function>>(true)
	type.never<TrueType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<TrueType<PrimitiveTypes>>(true)
})

it('can override Then/Else', () => {
	type.equal<TrueType<true, 1, 2>, 1>(true)

	type.equal<TrueType<any, 1, 2>, 2>(true)
	type.equal<TrueType<unknown, 1, 2>, 2>(true)
	type.equal<TrueType<never, 1, 2>, 2>(true)
	type.equal<TrueType<void, 1, 2>, 2>(true)
})
