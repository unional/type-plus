import { it } from '@jest/globals'
import { testType, type NotStrictNumberType } from '../index.js'

it('returns never if T is number', () => {
	testType.never<NotStrictNumberType<number>>(true)
})

it('returns T if T is number literial', () => {
	testType.equal<NotStrictNumberType<-1>, -1>(true)
	testType.equal<NotStrictNumberType<0>, 0>(true)
	testType.equal<NotStrictNumberType<1>, 1>(true)
	testType.equal<NotStrictNumberType<1.1>, 1.1>(true)
})

it('returns T for special types', () => {
	testType.equal<NotStrictNumberType<void>, void>(true)
	testType.equal<NotStrictNumberType<unknown>, unknown>(true)
	testType.equal<NotStrictNumberType<any>, any>(true)
	testType.equal<NotStrictNumberType<never>, never>(true)
})

it('returns T for all other types', () => {
	testType.equal<NotStrictNumberType<undefined>, undefined>(true)
	testType.equal<NotStrictNumberType<null>, null>(true)
	testType.equal<NotStrictNumberType<boolean>, boolean>(true)
	testType.equal<NotStrictNumberType<true>, true>(true)
	testType.equal<NotStrictNumberType<false>, false>(true)
	testType.equal<NotStrictNumberType<string>, string>(true)
	testType.equal<NotStrictNumberType<''>, ''>(true)
	testType.equal<NotStrictNumberType<symbol>, symbol>(true)
	testType.equal<NotStrictNumberType<bigint>, bigint>(true)
	testType.equal<NotStrictNumberType<{}>, {}>(true)
	testType.equal<NotStrictNumberType<string[]>, string[]>(true)
	testType.equal<NotStrictNumberType<[]>, []>(true)
	testType.equal<NotStrictNumberType<Function>, Function>(true)
	testType.equal<NotStrictNumberType<() => void>, () => void>(true)
})

it('returns T if T is union of non number', () => {
	testType.equal<NotStrictNumberType<number | string>, number | string>(true)
})

it('returns never if T is union of number and number literal', () => {
	testType.never<NotStrictNumberType<number | 1>>(true)
})

it('returns T if T is intersection of number', () => {
	testType.equal<NotStrictNumberType<number & { a: 1 }>, number & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStrictNumberType<number, 1, 2>, 2>(true)
	testType.equal<NotStrictNumberType<0, 1, 2>, 1>(true)

	testType.equal<NotStrictNumberType<any, 1, 2>, 1>(true)
	testType.equal<NotStrictNumberType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStrictNumberType<never, 1, 2>, 1>(true)
	testType.equal<NotStrictNumberType<void, 1, 2>, 1>(true)
})
