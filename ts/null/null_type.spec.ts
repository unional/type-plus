import { type, type NullType } from '../index.js'

it('returns T if T is null', () => {
	type.equal<NullType<null>, null>(true)
})

it('returns never for special types', () => {
	type.never<NullType<any>>(true)
	type.never<NullType<unknown>>(true)
	type.never<NullType<void>>(true)
	type.never<NullType<never>>(true)
})

test('returns never for other types', () => {
	type.never<NullType<undefined>>(true)
	type.never<NullType<number>>(true)
	type.never<NullType<boolean>>(true)
	type.never<NullType<true>>(true)
	type.never<NullType<false>>(true)
	type.never<NullType<string>>(true)
	type.never<NullType<''>>(true)
	type.never<NullType<symbol>>(true)
	type.never<NullType<bigint>>(true)
	type.never<NullType<{}>>(true)
	type.never<NullType<string[]>>(true)
	type.never<NullType<[]>>(true)
	type.never<NullType<Function>>(true)
	type.never<NullType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<NullType<null | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<NullType<null, 1, 2>, 1>(true)

	type.equal<NullType<any, 1, 2>, 2>(true)
	type.equal<NullType<unknown, 1, 2>, 2>(true)
	type.equal<NullType<never, 1, 2>, 2>(true)
	type.equal<NullType<void, 1, 2>, 2>(true)
})
