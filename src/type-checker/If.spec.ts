import { assertType } from '..'
import { If } from './If'

test('true gets Then', () => {
  assertType<If<true, 2, 3>>(2)
})

test('false gets Else', () => {
  assertType<If<false, 2, 3>>(3)
})
