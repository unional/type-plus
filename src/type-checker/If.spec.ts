import { If, isType } from '..'

test('true gets Then', () => {
  isType.equal<true, 2, If<true, 2, 3>>()
})

test('false gets Else', () => {
  isType.equal<true, 3, If<false, 2, 3>>()
})
