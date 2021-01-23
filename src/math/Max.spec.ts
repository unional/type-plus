import { isType, Max } from '..'

test('only support positive and whole number', () => {
  isType.equal<true, never, Max<0.1, 1>>()
  isType.equal<true, never, Max<-1, 1>>()
  isType.equal<true, never, Max<1, 0.1>>()
  isType.equal<true, never, Max<1, -1>>()
})

test('number gets never', () => {
  isType.equal<true, never, Max<number, 1>>()
  isType.equal<true, never, Max<1, number>>()
})

test('override Fail case', () => {
  isType.equal<true, number, Max<number, 1, number>>()
})

test('same number', () => {
  isType.equal<true, 123, Max<123, 123>>()
})

test('same number of digits', () => {
  isType.equal<true, 124, Max<123, 124>>()
  isType.equal<true, 126, Max<126, 124>>()
  isType.equal<true, 224, Max<126, 224>>()
  isType.equal<true, 726, Max<726, 224>>()
})

test('more digits win', () => {
  isType.equal<true, 123, Max<123, 22>>()
  isType.equal<true, 223, Max<12, 223>>()
  isType.equal<true, 1234567891011, Max<1234567891011, 123>>()
  isType.equal<true, 1234567891011, Max<123, 1234567891011>>()
})
