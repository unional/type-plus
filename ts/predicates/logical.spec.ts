import { And, assertType, Equal, Not, Or, Xor } from '../index.js'

describe('And<A,B>', () => {
  test('basic', () => {
    assertType.isTrue(true as And<true, true>)
    assertType.isFalse(false as And<true, false>)
    assertType.isFalse(false as And<false, true>)
    assertType.isFalse(false as And<false, false>)
  })
  test('boolean special handling', () => {
    assertType.isTrue(true as Equal<And<boolean, true>, boolean>)
    assertType.isFalse(false as And<boolean, false>)
    assertType.isTrue(true as Equal<And<true, boolean>, boolean>)
    assertType.isFalse(false as And<false, boolean>)
    assertType.isTrue(true as Equal<And<boolean, boolean>, boolean>)
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
    assertType.isTrue(true as Equal<Or<boolean, false>, boolean>)
    assertType.isTrue(true as Or<true, boolean>)
    assertType.isTrue(true as Equal<Or<false, boolean>, boolean>)
    assertType.isTrue(true as Equal<Or<boolean, boolean>, boolean>)
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
    assertType.isTrue(true as Equal<Xor<boolean, boolean>, boolean>)
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
