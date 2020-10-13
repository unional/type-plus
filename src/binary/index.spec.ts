import { assertType, Equal } from '..'
import { B } from '.'

test('B.BitNot<T>', () => {
  assertType.isTrue(true as Equal<B.BitNot<1>, 0>)
  assertType.isTrue(true as Equal<B.BitNot<0>, 1>)
})

test('B.BitAnd<A, B>', () => {
  assertType.isTrue(true as Equal<B.BitAnd<1, 1>, 1>)
  assertType.isTrue(true as Equal<B.BitAnd<1, 0>, 0>)
  assertType.isTrue(true as Equal<B.BitAnd<0, 1>, 0>)
  assertType.isTrue(true as Equal<B.BitAnd<0, 0>, 0>)
})

test('B.BitOr<A, B>', () => {
  assertType.isTrue(true as Equal<B.BitOr<1, 1>, 1>)
  assertType.isTrue(true as Equal<B.BitOr<1, 0>, 1>)
  assertType.isTrue(true as Equal<B.BitOr<0, 1>, 1>)
  assertType.isTrue(true as Equal<B.BitOr<0, 0>, 0>)
})

test('B.BitXor<A, B>', () => {
  assertType.isTrue(true as Equal<B.BitXor<1, 1>, 0>)
  assertType.isTrue(true as Equal<B.BitXor<1, 0>, 1>)
  assertType.isTrue(true as Equal<B.BitXor<0, 1>, 1>)
  assertType.isTrue(true as Equal<B.BitXor<0, 0>, 0>)
})
