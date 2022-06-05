import { IsPositive, isType } from '../index.js'

test('positive is true', () => {
  isType.t<IsPositive<0>>()
  isType.t<IsPositive<1>>()
  isType.t(true)
})

test('negative is false', () => {
  isType.f<IsPositive<-1>>()
})

test('number type is false because we cannot determine', () => {
  isType.f<IsPositive<number>>()
})
