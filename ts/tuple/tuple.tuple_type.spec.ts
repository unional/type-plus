import { isType, type TupleType } from '../index.js'

it('returns never if T is not array or tuple', () => {
	isType.never<TupleType<number>>()
	isType.never<TupleType<boolean>>()
	isType.never<TupleType<true>>()
	isType.never<TupleType<false>>()
	isType.never<TupleType<{}>>()
})

it('returns never if T is array', () => {
	isType.never<TupleType<string[]>>()
})

it('returns T if T is a tuple', () => {
	isType.equal<true, TupleType<[]>, []>()
	isType.equal<true, TupleType<[1]>, [1]>()
})

it('can override Then/Else', () => {
	isType.equal<true, TupleType<number, true, false>, false>()
	isType.equal<true, TupleType<[], true, false>, true>()
})
