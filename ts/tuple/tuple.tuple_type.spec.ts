import { type, type TupleType } from '../index.js'

it('returns never if T is not array or tuple', () => {
	type.never<TupleType<undefined>>(true)
	type.never<TupleType<null>>(true)
	type.never<TupleType<boolean>>(true)
	type.never<TupleType<true>>(true)
	type.never<TupleType<false>>(true)
	type.never<TupleType<string>>(true)
	type.never<TupleType<''>>(true)
	type.never<TupleType<symbol>>(true)
	type.never<TupleType<bigint>>(true)
	type.never<TupleType<{}>>(true)
	type.never<TupleType<string[]>>(true)
	type.never<TupleType<Function>>(true)
	type.never<TupleType<() => void>>(true)
})

it('returns never if T is array', () => {
	type.never<TupleType<string[]>>(true)
})

it('returns T if T is a tuple', () => {
	type.equal<TupleType<[]>, []>(true)
	type.equal<TupleType<[1]>, [1]>(true)
})

it('can override Then/Else', () => {
	type.equal<TupleType<[], 1, 2>, 1>(true)
	type.equal<TupleType<any, 1, 2>, 2>(true)
	type.equal<TupleType<unknown, 1, 2>, 2>(true)
	type.equal<TupleType<never, 1, 2>, 2>(true)
	type.equal<TupleType<void, 1, 2>, 2>(true)
})
