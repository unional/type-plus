import { type, type BooleanType, type PrimitiveTypes } from '../index.js'

it('returns boolean if T is boolean', () => {
	type.equal<BooleanType<boolean>, boolean>(true)
})

it('returns never if T is true or false literal', () => {
	type.never<BooleanType<true>>(true)
	type.never<BooleanType<false>>(true)
})

it('returns never for special types', () => {
	type.never<BooleanType<void>>(true)
	type.never<BooleanType<unknown>>(true)
	type.never<BooleanType<any>>(true)
	type.never<BooleanType<never>>(true)
})

it('returns never for all other types', () => {
	type.never<BooleanType<undefined>>(true)
	type.never<BooleanType<null>>(true)
	type.never<BooleanType<number>>(true)
	type.never<BooleanType<1>>(true)
	type.never<BooleanType<true>>(true)
	type.never<BooleanType<false>>(true)
	type.never<BooleanType<string>>(true)
	type.never<BooleanType<''>>(true)
	type.never<BooleanType<symbol>>(true)
	type.never<BooleanType<bigint>>(true)
	type.never<BooleanType<{}>>(true)
	type.never<BooleanType<string[]>>(true)
	type.never<BooleanType<[]>>(true)
	type.never<BooleanType<Function>>(true)
	type.never<BooleanType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<BooleanType<PrimitiveTypes>>(true)
})

it('can override Then/Else', () => {
	type.equal<BooleanType<boolean, 1, 2>, 1>(true)
	type.equal<BooleanType<true, 1, 2>, 2>(true)
	type.equal<BooleanType<false, 1, 2>, 2>(true)

	type.equal<BooleanType<any, 1, 2>, 2>(true)
	type.equal<BooleanType<unknown, 1, 2>, 2>(true)
	type.equal<BooleanType<never, 1, 2>, 2>(true)
	type.equal<BooleanType<void, 1, 2>, 2>(true)
})
