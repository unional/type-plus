import { type, type StrictNumberType } from '../index.js'

it('returns T if T is number', () => {
	type.equal<StrictNumberType<number>, number>(true)
})

it('returns never if T is number literial', () => {
	type.never<StrictNumberType<-1>>(true)
	type.never<StrictNumberType<0>>(true)
	type.never<StrictNumberType<1>>(true)
	type.never<StrictNumberType<1.1>>(true)
})

it('returns never for special types', () => {
	type.never<StrictNumberType<void>>(true)
	type.never<StrictNumberType<unknown>>(true)
	type.never<StrictNumberType<any>>(true)
	type.never<StrictNumberType<never>>(true)
})

it('returns never for other types', () => {
	type.never<StrictNumberType<undefined>>(true)
	type.never<StrictNumberType<null>>(true)
	type.never<StrictNumberType<boolean>>(true)
	type.never<StrictNumberType<true>>(true)
	type.never<StrictNumberType<false>>(true)
	type.never<StrictNumberType<string>>(true)
	type.never<StrictNumberType<''>>(true)
	type.never<StrictNumberType<symbol>>(true)
	type.never<StrictNumberType<bigint>>(true)
	type.never<StrictNumberType<1n>>(true)
	type.never<StrictNumberType<{}>>(true)
	type.never<StrictNumberType<string[]>>(true)
	type.never<StrictNumberType<[]>>(true)
	type.never<StrictNumberType<Function>>(true)
	type.never<StrictNumberType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	type.never<StrictNumberType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	type.equal<StrictNumberType<number | 1>, number>(true)
})

it('can override Then/Else', () => {
	type.equal<StrictNumberType<number, 1, 2>, 1>(true)
	type.equal<StrictNumberType<0, 1, 2>, 2>(true)

	type.equal<StrictNumberType<any, 1, 2>, 2>(true)
	type.equal<StrictNumberType<unknown, 1, 2>, 2>(true)
	type.equal<StrictNumberType<never, 1, 2>, 2>(true)
	type.equal<StrictNumberType<void, 1, 2>, 2>(true)
})
