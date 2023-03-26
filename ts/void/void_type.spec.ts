import { type, type VoidType } from '../index.js'

it('returns T if T is void', () => {
	type.equal<VoidType<void>, void>(true)
})

it('returns never for other special types', () => {
	type.never<VoidType<any>>(true)
	type.never<VoidType<unknown>>(true)
	type.never<VoidType<never>>(true)
})

test('returns never for other types', () => {
	type.never<VoidType<undefined>>(true)
	type.never<VoidType<null>>(true)
	type.never<VoidType<number>>(true)
	type.never<VoidType<1>>(true)
	type.never<VoidType<boolean>>(true)
	type.never<VoidType<true>>(true)
	type.never<VoidType<false>>(true)
	type.never<VoidType<string>>(true)
	type.never<VoidType<''>>(true)
	type.never<VoidType<symbol>>(true)
	type.never<VoidType<bigint>>(true)
	type.never<VoidType<1n>>(true)
	type.never<VoidType<{}>>(true)
	type.never<VoidType<string[]>>(true)
	type.never<VoidType<[]>>(true)
	type.never<VoidType<Function>>(true)
	type.never<VoidType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<VoidType<void | 1>>(true)
})

it('returns T for intersection type', () => {
	type.equal<VoidType<void & { a: 1 }>, void & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<VoidType<void, 1, 2>, 1>(true)
	type.equal<VoidType<0, 1, 2>, 2>(true)

	type.equal<VoidType<any, 1, 2>, 2>(true)
	type.equal<VoidType<unknown, 1, 2>, 2>(true)
	type.equal<VoidType<never, 1, 2>, 2>(true)
})
