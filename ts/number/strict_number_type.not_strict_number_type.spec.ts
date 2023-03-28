import { type, type NotStrictNumberType } from '../index.js'

it('returns never if T is number', () => {
	type.never<NotStrictNumberType<number>>(true)
})

it('returns T if T is number literial', () => {
	type.equal<NotStrictNumberType<-1>, -1>(true)
	type.equal<NotStrictNumberType<0>, 0>(true)
	type.equal<NotStrictNumberType<1>, 1>(true)
	type.equal<NotStrictNumberType<1.1>, 1.1>(true)
})

it('returns T for special types', () => {
	type.equal<NotStrictNumberType<void>, void>(true)
	type.equal<NotStrictNumberType<unknown>, unknown>(true)
	type.equal<NotStrictNumberType<any>, any>(true)
	type.equal<NotStrictNumberType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotStrictNumberType<undefined>, undefined>(true)
	type.equal<NotStrictNumberType<null>, null>(true)
	type.equal<NotStrictNumberType<boolean>, boolean>(true)
	type.equal<NotStrictNumberType<true>, true>(true)
	type.equal<NotStrictNumberType<false>, false>(true)
	type.equal<NotStrictNumberType<string>, string>(true)
	type.equal<NotStrictNumberType<''>, ''>(true)
	type.equal<NotStrictNumberType<symbol>, symbol>(true)
	type.equal<NotStrictNumberType<bigint>, bigint>(true)
	type.equal<NotStrictNumberType<{}>, {}>(true)
	type.equal<NotStrictNumberType<string[]>, string[]>(true)
	type.equal<NotStrictNumberType<[]>, []>(true)
	type.equal<NotStrictNumberType<Function>, Function>(true)
	type.equal<NotStrictNumberType<() => void>, () => void>(true)
})

it('returns T if T is union of non number', () => {
	type.equal<NotStrictNumberType<number | string>, number | string>(true)
})

it('returns never if T is union of number and number literal', () => {
	type.never<NotStrictNumberType<number | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotStrictNumberType<number, 1, 2>, 2>(true)
	type.equal<NotStrictNumberType<0, 1, 2>, 1>(true)

	type.equal<NotStrictNumberType<any, 1, 2>, 1>(true)
	type.equal<NotStrictNumberType<unknown, 1, 2>, 1>(true)
	type.equal<NotStrictNumberType<never, 1, 2>, 1>(true)
	type.equal<NotStrictNumberType<void, 1, 2>, 1>(true)
})


