import { type, type NotTupleType } from '../index.js'

it('returns never if T is a tuple', () => {
	type.never<NotTupleType<[]>>(true)
	type.never<NotTupleType<[1]>>(true)
})

it('returns T if T is an array', () => {
	type.equal<NotTupleType<string[]>, string[]>(true)
})

it('returns T for special types', () => {
	type.equal<NotTupleType<void>, void>(true)
	type.equal<NotTupleType<unknown>, unknown>(true)
	type.equal<NotTupleType<any>, any>(true)
	type.equal<NotTupleType<never>, never>(true)
})

it('returns T if T for other types', () => {
	type.equal<NotTupleType<undefined>, undefined>(true)
	type.equal<NotTupleType<null>, null>(true)
	type.equal<NotTupleType<boolean>, boolean>(true)
	type.equal<NotTupleType<true>, true>(true)
	type.equal<NotTupleType<false>, false>(true)
	type.equal<NotTupleType<number>, number>(true)
	type.equal<NotTupleType<1>, 1>(true)
	type.equal<NotTupleType<string>, string>(true)
	type.equal<NotTupleType<''>, ''>(true)
	type.equal<NotTupleType<symbol>, symbol>(true)
	type.equal<NotTupleType<bigint>, bigint>(true)
	type.equal<NotTupleType<1n>, 1n>(true)
	type.equal<NotTupleType<{}>, {}>(true)
	type.equal<NotTupleType<string[]>, string[]>(true)
	type.equal<NotTupleType<Function>, Function>(true)
	type.equal<NotTupleType<() => void>, () => void>(true)
})

it('returns T if T is an union of tuple and other types', () => {
	type.equal<NotTupleType<[1] | string>, [1] | string>(true)
})

it('returns never if T is union of tuples', () => {
	type.never<NotTupleType<[] | [1]>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotTupleType<[], 1, 2>, 2>(true)
	type.equal<NotTupleType<string[], 1, 2>, 1>(true)

	type.equal<NotTupleType<any, 1, 2>, 1>(true)
	type.equal<NotTupleType<unknown, 1, 2>, 1>(true)
	type.equal<NotTupleType<never, 1, 2>, 1>(true)
	type.equal<NotTupleType<void, 1, 2>, 1>(true)
})
