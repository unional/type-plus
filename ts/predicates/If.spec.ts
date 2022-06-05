import { assertType, If, isType } from '../index.js'

test('true gets Then', () => {
  assertType<If<true, 2, 3>>(2)
})

test('false gets Else', () => {
  assertType<If<false, 2, 3>>(3)
})

test('Then defaults to true and Else defaults to false', () => {
  isType.t<If<true>>()
  isType.f<If<false>>()
})
