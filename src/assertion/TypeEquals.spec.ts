import { assertType } from './assertType'
import { TypeEquals } from './TypeEquals'

test('match', () => {
  assertType.isTrue(true as TypeEquals<false, false>)
})

test('not match', () => {
  assertType.isFalse(false as TypeEquals<string, number>)
})

test('literal is not equal to widen type', () => {
  assertType.isFalse(false as TypeEquals<1, number>)
  assertType.isFalse(false as TypeEquals<number, 1>)
})

test('super set and sub set are not equal', () => {
  assertType.isFalse(false as TypeEquals<{ a: 1 }, { a: 1, b: 2 }>)
  assertType.isFalse(false as TypeEquals<{ a: 1, b: 2 }, { a: 1 }>)
})
