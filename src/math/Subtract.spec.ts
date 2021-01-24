import { isType } from '..'
import { Subtract } from './Subtract'

test('only support positive and whole number', () => {
  isType.equal<true, never, Subtract<0.1, 1>>()
  isType.equal<true, never, Subtract<-1, 1>>()
  isType.equal<true, never, Subtract<1, 0.1>>()
  isType.equal<true, never, Subtract<1, -1>>()
})

test('number gets never', () => {
  isType.equal<true, never, Subtract<number, 1>>()
  isType.equal<true, never, Subtract<1, number>>()
})

test('override Fail case', () => {
  isType.equal<true, number, Subtract<number, 1, number>>()
})

test('single digit', () => {
  isType.equal<true, 0, Subtract<0, 0>>()
  isType.equal<true, 0, Subtract<1, 1>>()
  isType.equal<true, 0, Subtract<2, 2>>()
  isType.equal<true, 0, Subtract<3, 3>>()
  isType.equal<true, 0, Subtract<4, 4>>()
  isType.equal<true, 0, Subtract<5, 5>>()
  isType.equal<true, 0, Subtract<6, 6>>()
  isType.equal<true, 0, Subtract<7, 7>>()
  isType.equal<true, 0, Subtract<8, 8>>()
  isType.equal<true, 0, Subtract<9, 9>>()
})

test('multi digits', () => {
  isType.equal<true, 100, Subtract<123, 23>>()
  isType.equal<true, 6543, Subtract<7777, 1234>>()
})

test('negative results gets Fail', () => {
  isType.equal<true, 'no~~', Subtract<1, 2, 'no~~'>>()
  isType.equal<true, never, Subtract<12345, 12346>>()
})
