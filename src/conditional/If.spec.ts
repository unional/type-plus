import { assertType, If, isType } from '..'

test('true gets Then', () => {
  assertType<If<true, 2, 3>>(2)
})

test('false gets Else', () => {
  assertType<If<false, 2, 3>>(3)
})

test('Then defaults to true and Else defaults to false', () => {
  isType.true<If<true>>()
  isType.false<If<false>>()
})
