import { type, type Integer } from '../index.js'

it('returns never if N is number as it can contain float', () => {
	type.never<Integer<number>>(true)
})

it('returns N if N is an integer literal', () => {
	type.equal<Integer<-1>, -1>(true)
	type.equal<Integer<-2>, -2>(true)
	type.equal<Integer<-0>, 0>(true)
	type.equal<Integer<1>, 1>(true)
	type.equal<Integer<2>, 2>(true)
})

it('returns N if N is bigint as bigint can only be integer', () => {
	type.equal<Integer<bigint>, bigint>(true)
	type.equal<Integer<-1n>, -1n>(true)
	type.equal<Integer<-2n>, -2n>(true)
	type.equal<Integer<-0n>, 0n>(true)
	type.equal<Integer<1n>, 1n>(true)
	type.equal<Integer<2n>, 2n>(true)
})

it('returns never if N is a fraction', () => {
	type.never<Integer<1.1>>(true)
	type.never<Integer<-1.1>>(true)
})

it('returns never if N is a special type', () => {
	type.never<Integer<any>>(true)
	type.never<Integer<unknown>>(true)
	type.never<Integer<never>>(true)
	type.never<Integer<void>>(true)
})

test('returns never for singular types', () => {
	type.never<Integer<undefined>>(true)
	type.never<Integer<null>>(true)
	type.never<Integer<number>>(true)
	type.never<Integer<boolean>>(true)
	type.never<Integer<true>>(true)
	type.never<Integer<false>>(true)
	type.never<Integer<string>>(true)
	type.never<Integer<''>>(true)
	type.never<Integer<symbol>>(true)
	type.never<Integer<{}>>(true)
	type.never<Integer<string[]>>(true)
	type.never<Integer<[]>>(true)
	type.never<Integer<Function>>(true)
	type.never<Integer<() => void>>(true)
})

it('can override Then/Else', () => {
	type.equal<Integer<-1, 1, 2>, 1>(true)
	type.equal<Integer<1.1, 1, 2>, 2>(true)

	type.equal<Integer<any, 1, 2>, 2>(true)
	type.equal<Integer<unknown, 1, 2>, 2>(true)
	type.equal<Integer<never, 1, 2>, 2>(true)
	type.equal<Integer<void, 1, 2>, 2>(true)
})
