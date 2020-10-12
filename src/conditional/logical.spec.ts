import { And, assertType, Not, Or } from '..'
import { Equal } from '../assertion'
import { Xor } from './logical'

describe('And<A,B>', () => {
  test('basic', () => {
    assertType.isTrue(true as And<true, true>)
    assertType.isFalse(false as And<true, false>)
    assertType.isFalse(false as And<false, true>)
    assertType.isFalse(false as And<false, false>)
  })
  test('boolean special handling', () => {
    assertType.isFalse(false as And<boolean, true>)
    assertType.isFalse(false as And<boolean, false>)
    assertType.isFalse(false as And<true, boolean>)
    assertType.isFalse(false as And<false, boolean>)
  })
})

describe('Or<A,B>', () => {
  test('basic', () => {
    assertType.isTrue(true as Or<true, true>)
    assertType.isTrue(true as Or<true, false>)
    assertType.isTrue(true as Or<false, true>)
    assertType.isFalse(false as Or<false, false>)
  })
  test('boolean special handling', () => {
    assertType.isTrue(true as Or<boolean, true>)
    assertType.isFalse(false as Or<boolean, false>)
    assertType.isTrue(true as Or<true, boolean>)
    assertType.isFalse(false as Or<false, boolean>)
  })
})

describe('Xor<A,B>', () => {
  test('basic', () => {
    assertType.isFalse(false as Xor<true, true>)
    assertType.isTrue(true as Xor<true, false>)
    assertType.isTrue(true as Xor<false, true>)
    assertType.isFalse(false as Xor<false, false>)
  })
  test('boolean special handling', () => {
    assertType.isTrue(true as Equal<Xor<boolean, true>, boolean>)
    assertType.isTrue(true as Equal<Xor<boolean, false>, boolean>)
    assertType.isTrue(true as Equal<Xor<true, boolean>, boolean>)
    assertType.isTrue(true as Equal<Xor<false, boolean>, boolean>)
  })
})

describe('Not<X>', () => {
  test('basic', () => {
    assertType.isTrue(true as Not<false>)
    assertType.isFalse(false as Not<true>)
  })
  test('boolean special handling', () => {
    assertType.isTrue(true as Equal<Not<boolean>, boolean>)
  })
})
