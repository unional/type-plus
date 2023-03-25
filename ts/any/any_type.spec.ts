import { type, type AnyType, type PrimitiveTypes } from '../index.js'

it('returns any for any', () => {
	type.equal<AnyType<any>, any>(true)
})

it('returns never for other special types', () => {
	type.never<AnyType<unknown>>(true)
	type.never<AnyType<void>>(true)
	type.never<AnyType<never>>(true)
})

test('returns never for singular types', () => {
	type.never<AnyType<undefined>>(true)
	type.never<AnyType<null>>(true)
	type.never<AnyType<number>>(true)
	type.never<AnyType<boolean>>(true)
	type.never<AnyType<true>>(true)
	type.never<AnyType<false>>(true)
	type.never<AnyType<string>>(true)
	type.never<AnyType<''>>(true)
	type.never<AnyType<symbol>>(true)
	type.never<AnyType<bigint>>(true)
	type.never<AnyType<{}>>(true)
	type.never<AnyType<string[]>>(true)
	type.never<AnyType<[]>>(true)
	type.never<AnyType<Function>>(true)
	type.never<AnyType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<AnyType<PrimitiveTypes>>(true)
})

it('returns never for intersection type', () => {
	type.never<AnyType<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<AnyType<any, 1, 2>, 1>(true)
	type.equal<AnyType<never, 1, 2>, 2>(true)
	type.equal<AnyType<unknown, 1, 2>, 2>(true)
	type.equal<AnyType<void, 1, 2>, 2>(true)
})
