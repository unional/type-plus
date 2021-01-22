import { IsPositive, isType } from '..'

test('positive is true', () => {
  isType.true<IsPositive<0>>()
  isType.true<IsPositive<1>>()
  isType.true(true)
})

test('negative is false', () => {
  isType.false<IsPositive<-1>>()
})

test('number type is false because we cannot determine', () => {
  isType.false<IsPositive<number>>()
})
