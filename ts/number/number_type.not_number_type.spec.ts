import { type, type NotNumberType } from '../index.js'

it('returns never if T is number', () => {
	type.never<NotNumberType<number>>(true)
})

it('returns never if T is number literial', () => {
	type.never<NotNumberType<-1>>(true)
	type.never<NotNumberType<0>>(true)
	type.never<NotNumberType<1>>(true)
	type.never<NotNumberType<1.1>>(true)
})

it('returns T for special types', () => {
	type.equal<NotNumberType<void>, void>(true)
	type.equal<NotNumberType<unknown>, unknown>(true)
	type.equal<NotNumberType<any>, any>(true)
	type.equal<NotNumberType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotNumberType<undefined>, undefined>(true)
	type.equal<NotNumberType<null>, null>(true)
	type.equal<NotNumberType<boolean>, boolean>(true)
	type.equal<NotNumberType<true>, true>(true)
	type.equal<NotNumberType<false>, false>(true)
	type.equal<NotNumberType<string>, string>(true)
	type.equal<NotNumberType<''>, ''>(true)
	type.equal<NotNumberType<symbol>, symbol>(true)
	type.equal<NotNumberType<bigint>, bigint>(true)
	type.equal<NotNumberType<{}>, {}>(true)
	type.equal<NotNumberType<string[]>, string[]>(true)
	type.equal<NotNumberType<[]>, []>(true)
	type.equal<NotNumberType<Function>, Function>(true)
	type.equal<NotNumberType<() => void>, () => void>(true)
})

it('returns T if T is union of non number', () => {
	type.equal<NotNumberType<number | string>, number | string>(true)
})

it('returns never if T is union of number and number literal', () => {
	type.never<NotNumberType<number | 1>>(true)
})

it('returns never if T is intersection of number', () => {
	type.equal<NotNumberType<number & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	type.equal<NotNumberType<number, 1, 2>, 2>(true)
	type.equal<NotNumberType<0, 1, 2>, 2>(true)

	type.equal<NotNumberType<any, 1, 2>, 1>(true)
	type.equal<NotNumberType<unknown, 1, 2>, 1>(true)
	type.equal<NotNumberType<never, 1, 2>, 1>(true)
	type.equal<NotNumberType<void, 1, 2>, 1>(true)
})
