import { GreaterThan, isType } from '..'

test('only support positive and whole number', () => {
  isType.equal<true, never, GreaterThan<0.1, 1>>()
  isType.equal<true, never, GreaterThan<-1, 1>>()
  isType.equal<true, never, GreaterThan<1, 0.1>>()
  isType.equal<true, never, GreaterThan<1, -1>>()
})

test('number gets never', () => {
  isType.equal<true, never, GreaterThan<number, 1>>()
  isType.equal<true, never, GreaterThan<1, number>>()
})

test('override Fail case', () => {
  isType.equal<true, number, GreaterThan<number, 1, number>>()
})

test('n > n is false', () => {
  isType.f<GreaterThan<0, 0>>()
  isType.f<GreaterThan<1, 1>>()
  isType.f<GreaterThan<12, 12>>()
})

test('with same number of digits', () => {
  isType.t<GreaterThan<1, 0>>()
  isType.t<GreaterThan<22, 11>>()
  isType.t<GreaterThan<20, 19>>()
  isType.t<GreaterThan<19, 10>>()

  isType.f<GreaterThan<0, 1>>()
  isType.f<GreaterThan<11, 22>>()
  isType.f<GreaterThan<19, 20>>()
  isType.f<GreaterThan<10, 19>>()
})

test('with different number of digits', () => {
  isType.f<GreaterThan<0, 1>>()
  isType.f<GreaterThan<9, 100>>()
  isType.t<GreaterThan<10, 1>>()
  isType.t<GreaterThan<123, 32>>()
  isType.t<GreaterThan<123, 13>>()
})
