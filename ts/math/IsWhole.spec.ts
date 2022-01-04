import { isType, IsWhole } from '..'

test('whole number is true', () => {
  isType.t<IsWhole<1>>()
  isType.t<IsWhole<1.>>()
  isType.t<IsWhole<0>>()
  isType.t<IsWhole<0.>>()
  isType.t<IsWhole<-0>>()
  isType.t<IsWhole<-1>>()
})

test('fraction is false', () => {
  isType.f<IsWhole<0.1>>()
  isType.f<IsWhole<-0.1>>()
})

test('number type is false because we cannot determine', () => {
  isType.f<IsWhole<number>>()
})
