import { FalseType, PrimitiveTypes, type } from '../index.js'

it('returns T if T is false', () => {
	type.equal<FalseType<false>, false>(true)
})

it('returns never if T is boolean or true', () => {
	type.never<FalseType<boolean>>(true)
	type.never<FalseType<true>>(true)
})

it('returns never for special types', () => {
	type.never<FalseType<void>>(true)
	type.never<FalseType<unknown>>(true)
	type.never<FalseType<any>>(true)
	type.never<FalseType<never>>(true)
})

it('returns never for all other types', () => {
	type.never<FalseType<undefined>>(true)
	type.never<FalseType<null>>(true)
	type.never<FalseType<number>>(true)
	type.never<FalseType<boolean>>(true)
	type.never<FalseType<true>>(true)
	type.never<FalseType<string>>(true)
	type.never<FalseType<''>>(true)
	type.never<FalseType<symbol>>(true)
	type.never<FalseType<bigint>>(true)
	type.never<FalseType<{}>>(true)
	type.never<FalseType<string[]>>(true)
	type.never<FalseType<[]>>(true)
	type.never<FalseType<Function>>(true)
	type.never<FalseType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<FalseType<PrimitiveTypes>>(true)
})

it('can override Then/Else', () => {
	type.equal<FalseType<false, 1, 2>, 1>(true)

	type.equal<FalseType<any, 1, 2>, 2>(true)
	type.equal<FalseType<unknown, 1, 2>, 2>(true)
	type.equal<FalseType<never, 1, 2>, 2>(true)
	type.equal<FalseType<void, 1, 2>, 2>(true)
})
