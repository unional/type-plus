import { CreateTuple, isType } from '..'

test('create empty tuple', () => {
  isType.equal<true, [], CreateTuple<0>>()
})

test('single element', () => {
  isType.equal<true, [any], CreateTuple<1>>()
})

test('multiple elements', () => {
  isType.equal<true, [any, any, any], CreateTuple<3>>()
})

test('override element type', () => {
  isType.equal<true, [1, 1, 1, 1, 1], CreateTuple<5, 1>>()
})

test('negative length gets never', () => {
  isType.equal<true, never, CreateTuple<-1>>()
})
