import { it } from '@jest/globals'
import { testType, type NotTupleType } from '../index.js'

it('returns never if T is a tuple', () => {
	testType.never<NotTupleType<[]>>(true)
	testType.never<NotTupleType<[1]>>(true)
})

it('returns T if T is an array', () => {
	testType.equal<NotTupleType<string[]>, string[]>(true)
})

it('returns T for special types', () => {
	testType.equal<NotTupleType<void>, void>(true)
	testType.equal<NotTupleType<unknown>, unknown>(true)
	testType.equal<NotTupleType<any>, any>(true)
	testType.equal<NotTupleType<never>, never>(true)
})

it('returns T if T for other types', () => {
	testType.equal<NotTupleType<undefined>, undefined>(true)
	testType.equal<NotTupleType<null>, null>(true)
	testType.equal<NotTupleType<boolean>, boolean>(true)
	testType.equal<NotTupleType<true>, true>(true)
	testType.equal<NotTupleType<false>, false>(true)
	testType.equal<NotTupleType<number>, number>(true)
	testType.equal<NotTupleType<1>, 1>(true)
	testType.equal<NotTupleType<string>, string>(true)
	testType.equal<NotTupleType<''>, ''>(true)
	testType.equal<NotTupleType<symbol>, symbol>(true)
	testType.equal<NotTupleType<bigint>, bigint>(true)
	testType.equal<NotTupleType<1n>, 1n>(true)
	testType.equal<NotTupleType<{}>, {}>(true)
	testType.equal<NotTupleType<string[]>, string[]>(true)
	testType.equal<NotTupleType<Function>, Function>(true)
	testType.equal<NotTupleType<() => void>, () => void>(true)
})

it('returns T if T is an union of tuple and other types', () => {
	testType.equal<NotTupleType<[1] | string>, [1] | string>(true)
})

it('returns never if T is union of tuples', () => {
	testType.never<NotTupleType<[] | [1]>>(true)
})

it('returns never if T is intersection of tuples', () => {
	testType.equal<NotTupleType<[] & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotTupleType<[], 1, 2>, 2>(true)
	testType.equal<NotTupleType<string[], 1, 2>, 1>(true)

	testType.equal<NotTupleType<any, 1, 2>, 1>(true)
	testType.equal<NotTupleType<unknown, 1, 2>, 1>(true)
	testType.equal<NotTupleType<never, 1, 2>, 1>(true)
	testType.equal<NotTupleType<void, 1, 2>, 1>(true)
})

it('can override never case', () => {
	testType.equal<NotTupleType<never, 1, 2, { caseNever: 3 }>, 3>(true)
})
