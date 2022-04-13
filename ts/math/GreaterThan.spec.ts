import { GreaterThan, isType } from '..'

test('only support whole number', () => {
  isType.equal<true, never, GreaterThan<0.1, 1>>()
  isType.equal<true, never, GreaterThan<1, 0.1>>()
})

test('number gets never', () => {
  isType.equal<true, never, GreaterThan<number, 1>>()
  isType.equal<true, never, GreaterThan<1, number>>()
})

test('override Fail case', () => {
  isType.equal<true, number, GreaterThan<number, 2, number>>()
})

test('n > n is false', () => {
  isType.equal<true, false, GreaterThan<0, 0>>()
  isType.equal<true, false, GreaterThan<1, 1>>()
  isType.equal<true, false, GreaterThan<12, 12>>()
})

test('with same number of digits', () => {
  isType.equal<true, true, GreaterThan<1, 0>>()
  isType.equal<true, true, GreaterThan<22, 11>>()
  isType.equal<true, true, GreaterThan<20, 19>>()
  isType.equal<true, true, GreaterThan<19, 10>>()

  isType.equal<true, false, GreaterThan<0, 1>>()
  isType.equal<true, false, GreaterThan<11, 22>>()
  isType.equal<true, false, GreaterThan<19, 20>>()
  isType.equal<true, false, GreaterThan<10, 19>>()
})

test('with different number of digits', () => {
  isType.equal<true, false, GreaterThan<0, 1>>()
  isType.equal<true, false, GreaterThan<9, 100>>()
  isType.equal<true, true, GreaterThan<10, 1>>()
  isType.equal<true, true, GreaterThan<123, 32>>()
  isType.equal<true, true, GreaterThan<123, 13>>()
})

test('-0 > 0 and 0 > -0 are false', () => {
  isType.equal<true, false, GreaterThan<-0, 0>>()
  isType.equal<true, false, GreaterThan<0, -0>>()
})

test('works with negative numbers', () => {
  isType.equal<true, true, GreaterThan<0, -1>>()
  isType.equal<true, true, GreaterThan<1, -1>>()
  isType.equal<true, true, GreaterThan<2, -1>>()

  isType.equal<true, false, GreaterThan<-1, 0>>()
  isType.equal<true, false, GreaterThan<-1, 1>>()
  isType.equal<true, false, GreaterThan<-1, 2>>()

  isType.equal<true, false, GreaterThan<-0, -0>>()
  isType.equal<true, false, GreaterThan<-1, -1>>()

  isType.equal<true, true, GreaterThan<-0, -1>>()
  isType.equal<true, false, GreaterThan<-1, -1>>()
  isType.equal<true, false, GreaterThan<-2, -1>>()

  isType.equal<true, false, GreaterThan<-1, -0>>()
  isType.equal<true, false, GreaterThan<-1, -1>>()
  isType.equal<true, true, GreaterThan<-1, -2>>()
})

test('work with large numbers', () => {
  isType.equal<true, true, GreaterThan<1000000, 0>>()
  isType.equal<true, false, GreaterThan<0, 1000000>>()

  isType.equal<true, false, GreaterThan<-1000000, 0>>()
  isType.equal<true, true, GreaterThan<0, -1000000>>()
})
