import { testType, type NotNumberType } from '../index.js'

it('returns never if T is number', () => {
	testType.never<NotNumberType<number>>(true)
})

it('returns never if T is number literial', () => {
	testType.never<NotNumberType<-1>>(true)
	testType.never<NotNumberType<0>>(true)
	testType.never<NotNumberType<1>>(true)
	testType.never<NotNumberType<1.1>>(true)
})

it('returns T for special types', () => {
	testType.equal<NotNumberType<void>, void>(true)
	testType.equal<NotNumberType<unknown>, unknown>(true)
	testType.equal<NotNumberType<any>, any>(true)
	testType.equal<NotNumberType<never>, never>(true)
})

it('returns T for all other types', () => {
	testType.equal<NotNumberType<undefined>, undefined>(true)
	testType.equal<NotNumberType<null>, null>(true)
	testType.equal<NotNumberType<boolean>, boolean>(true)
	testType.equal<NotNumberType<true>, true>(true)
	testType.equal<NotNumberType<false>, false>(true)
	testType.equal<NotNumberType<string>, string>(true)
	testType.equal<NotNumberType<''>, ''>(true)
	testType.equal<NotNumberType<symbol>, symbol>(true)
	testType.equal<NotNumberType<bigint>, bigint>(true)
	testType.equal<NotNumberType<{}>, {}>(true)
	testType.equal<NotNumberType<string[]>, string[]>(true)
	testType.equal<NotNumberType<[]>, []>(true)
	testType.equal<NotNumberType<Function>, Function>(true)
	testType.equal<NotNumberType<() => void>, () => void>(true)
})

it('returns T if T is union of non number', () => {
	testType.equal<NotNumberType<number | string>, number | string>(true)
})

it('returns never if T is union of number and number literal', () => {
	testType.never<NotNumberType<number | 1>>(true)
})

it('returns never if T is intersection of number', () => {
	testType.equal<NotNumberType<number & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotNumberType<number, 1, 2>, 2>(true)
	testType.equal<NotNumberType<0, 1, 2>, 2>(true)

	testType.equal<NotNumberType<any, 1, 2>, 1>(true)
	testType.equal<NotNumberType<unknown, 1, 2>, 1>(true)
	testType.equal<NotNumberType<never, 1, 2>, 1>(true)
	testType.equal<NotNumberType<void, 1, 2>, 1>(true)
})
