import { type, type NumberType } from '../index.js'

it('returns T if T is number', () => {
	type.equal<NumberType<number>, number>(true)
})

it('returns never if T is number literial', () => {
	type.never<NumberType<-1>>(true)
	type.never<NumberType<0>>(true)
	type.never<NumberType<1>>(true)
	type.never<NumberType<1.1>>(true)
})

it('returns never for special types', () => {
	type.never<NumberType<void>>(true)
	type.never<NumberType<unknown>>(true)
	type.never<NumberType<any>>(true)
	type.never<NumberType<never>>(true)
})

it('returns never for other types', () => {
	type.never<NumberType<undefined>>(true)
	type.never<NumberType<null>>(true)
	type.never<NumberType<boolean>>(true)
	type.never<NumberType<true>>(true)
	type.never<NumberType<false>>(true)
	type.never<NumberType<string>>(true)
	type.never<NumberType<''>>(true)
	type.never<NumberType<symbol>>(true)
	type.never<NumberType<bigint>>(true)
	type.never<NumberType<1n>>(true)
	type.never<NumberType<{}>>(true)
	type.never<NumberType<string[]>>(true)
	type.never<NumberType<[]>>(true)
	type.never<NumberType<Function>>(true)
	type.never<NumberType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	type.never<NumberType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	type.equal<NumberType<number | 1>, number>(true)
})

it('can override Then/Else', () => {
	type.equal<NumberType<number, 1, 2>, 1>(true)
	type.equal<NumberType<0, 1, 2>, 2>(true)

	type.equal<NumberType<any, 1, 2>, 2>(true)
	type.equal<NumberType<unknown, 1, 2>, 2>(true)
	type.equal<NumberType<never, 1, 2>, 2>(true)
	type.equal<NumberType<void, 1, 2>, 2>(true)
})
