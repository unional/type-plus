import { isType, IsWhole } from '..'

test('whole number is true', () => {
  isType.true<IsWhole<1>>()
  isType.true<IsWhole<1.>>()
  isType.true<IsWhole<0>>()
  isType.true<IsWhole<0.>>()
  isType.true<IsWhole<-0>>()
  isType.true<IsWhole<-1>>()
})

test('fraction is false', () => {
  isType.false<IsWhole<0.1>>()
  isType.false<IsWhole<-0.1>>()
})

test('number type is false because we cannot determine', () => {
  isType.false<IsWhole<number>>()
})
