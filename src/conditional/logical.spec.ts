import { And, assertType, Not, Or } from '..'
import { Xor } from './logical'

test('And<A,B>', () => {
  assertType.isTrue(true as And<true, true>)
  assertType.isFalse(false as And<true, false>)
  assertType.isFalse(false as And<false, true>)
  assertType.isFalse(false as And<false, false>)
})

test('Or<A,B>', () => {
  assertType.isTrue(true as Or<true, true>)
  assertType.isTrue(true as Or<true, false>)
  assertType.isTrue(true as Or<false, true>)
  assertType.isFalse(false as Or<false, false>)
})

test('Xor<A,B>', () => {
  assertType.isFalse(false as Xor<true, true>)
  assertType.isTrue(true as Xor<true, false>)
  assertType.isTrue(true as Xor<false, true>)
  assertType.isFalse(false as Xor<false, false>)
})

test('Not<X>', () => {
  assertType.isTrue(true as Not<false>)
  assertType.isFalse(false as Not<true>)
})
