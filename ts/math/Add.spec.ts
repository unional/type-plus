import { isType } from '../predicates/index.js'
import type { Add, Increment } from './Add.js'

describe('Add<A, B>', () => {
  test('fractional A gets never', () => {
    isType.equal<true, never, Add<1.1, 1>>()
  })

  test('negative A gets never', () => {
    isType.equal<true, never, Add<-1, 1>>()
  })

  test('fractional B gets never', () => {
    isType.equal<true, never, Add<1, 1.2>>()
  })

  test('negative B gets never', () => {
    isType.equal<true, never, Add<1, -1>>()
  })

  test('number gets Fail', () => {
    isType.equal<true, never, Add<number, 1>>()
    isType.equal<true, never, Add<1, number>>()

    isType.equal<true, number, Add<number, 1, number>>()
    isType.equal<true, number, Add<1, number, number>>()
  })

  describe('single digit', () => {
    test('0 + n = n', () => {
      isType.equal<true, 0, Add<0, 0>>()
      isType.equal<true, 1, Add<0, 1>>()
      isType.equal<true, 2, Add<0, 2>>()
      isType.equal<true, 3, Add<0, 3>>()
      isType.equal<true, 4, Add<0, 4>>()
      isType.equal<true, 5, Add<0, 5>>()
      isType.equal<true, 6, Add<0, 6>>()
      isType.equal<true, 7, Add<0, 7>>()
      isType.equal<true, 8, Add<0, 8>>()
      isType.equal<true, 9, Add<0, 9>>()
    })
    test('9 + n', () => {
      isType.equal<true, 9, Add<9, 0>>()
      isType.equal<true, 10, Add<9, 1>>()
      isType.equal<true, 11, Add<9, 2>>()
      isType.equal<true, 12, Add<9, 3>>()
      isType.equal<true, 13, Add<9, 4>>()
      isType.equal<true, 14, Add<9, 5>>()
      isType.equal<true, 15, Add<9, 6>>()
      isType.equal<true, 16, Add<9, 7>>()
      isType.equal<true, 17, Add<9, 8>>()
      isType.equal<true, 18, Add<9, 9>>()
    })
  })

  test('1 + 2 digits', () => {
    isType.equal<true, 16, Add<3, 13>>()
    isType.equal<true, 108, Add<9, 99>>()
  })

  test('2 + 1 digits', () => {
    isType.equal<true, 16, Add<13, 3>>()
    isType.equal<true, 108, Add<99, 9>>()
  })

  test('2 + 2 digits', () => {
    isType.equal<true, 20, Add<10, 10>>()
    isType.equal<true, 38, Add<19, 19>>()
  })

  test('n + n digits', () => {
    isType.equal<true, 7777, Add<1234, 6543>>()
  })
})

describe('Increment<A>', () => {
  test('add 1', () => {
    isType.equal<true, 1, Increment<0>>()
  })
  test('work with large number', () => {
    isType.equal<true, 7777, Increment<7776>>()
  })
})
