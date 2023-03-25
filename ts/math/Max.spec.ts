import { Max, type } from '../index.js'

test('only support whole number', () => {
	type.never<Max<0.1, 1>>(true)
	type.never<Max<1, 0.1>>(true)
})

test('number gets never', () => {
	type.never<Max<number, 1>>(true)
	type.never<Max<1, number>>(true)
})

test('override Fail case', () => {
	type.number<Max<number, 1, number>>(true)
})

test('same number', () => {
	type.equal<Max<123, 123>, 123>(true)
})

test('same number of digits', () => {
	type.equal<Max<123, 124>, 124>(true)
	type.equal<Max<126, 124>, 126>(true)
	type.equal<Max<126, 224>, 224>(true)
	type.equal<Max<726, 224>, 726>(true)
})

test('more digits win', () => {
	type.equal<Max<123, 22>, 123>(true)
	type.equal<Max<12, 223>, 223>(true)
	type.equal<Max<1234567891011, 123>, 1234567891011>(true)
	type.equal<Max<123, 1234567891011>, 1234567891011>(true)
})

test('work with negative numbers', () => {
	type.equal<Max<0, -0>, 0>(true)
	type.equal<Max<-0, 0>, 0>(true)
	type.equal<Max<-0, -0>, 0>(true)

	type.equal<Max<0, -1>, 0>(true)
	type.equal<Max<1, -1>, 1>(true)
	type.equal<Max<2, -1>, 2>(true)

	type.equal<Max<-1, 0>, 0>(true)
	type.equal<Max<-1, 1>, 1>(true)
	type.equal<Max<-1, 2>, 2>(true)

	type.equal<Max<-1, -2>, -1>(true)
	type.equal<Max<-2, -2>, -2>(true)
	type.equal<Max<-3, -2>, -2>(true)
})

test('work with large numbers', () => {
	type.equal<Max<1000000, 0>, 1000000>(true)
	type.equal<Max<0, 1000000>, 1000000>(true)

	type.equal<Max<-1000000, 0>, 0>(true)
	type.equal<Max<0, -1000000>, 0>(true)
})
