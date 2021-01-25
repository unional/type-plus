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
  isType.false<GreaterThan<0, 0>>()
  isType.false<GreaterThan<1, 1>>()
  isType.false<GreaterThan<12, 12>>()
})

test('with same number of digits', () => {
  isType.true<GreaterThan<1, 0>>()
  isType.true<GreaterThan<22, 11>>()
  isType.true<GreaterThan<20, 19>>()

  isType.false<GreaterThan<0, 1>>()
  isType.false<GreaterThan<11, 22>>()
  isType.false<GreaterThan<19, 20>>()
})

test('with different number of digits', () => {
  isType.false<GreaterThan<0, 1>>()
  isType.false<GreaterThan<9, 100>>()
  isType.true<GreaterThan<10, 1>>()
  isType.true<GreaterThan<123, 32>>()
})
