import { assertType, Equal, NotEqual } from '..'

describe('TypeEquals', () => {
  test('match', () => {
    assertType.isTrue(true as Equal<false, false>)
  })

  test('not match', () => {
    assertType.isFalse(false as Equal<string, number>)
  })

  test('literal is not equal to widen type', () => {
    assertType.isFalse(false as Equal<1, number>)
    assertType.isFalse(false as Equal<number, 1>)
  })

  test('super set and sub set are not equal', () => {
    assertType.isFalse(false as Equal<{ a: 1 }, { a: 1, b: 2 }>)
    assertType.isFalse(false as Equal<{ a: 1, b: 2 }, { a: 1 }>)
  })

  test('boolean', () => {
    assertType.isTrue(true as Equal<boolean, boolean>)
    assertType.isTrue(true as Equal<true, true>)
    assertType.isTrue(true as Equal<false, false>)
    assertType.isFalse(false as Equal<boolean, true>)
    assertType.isFalse(false as Equal<true, boolean>)
    assertType.isFalse(false as Equal<boolean, false>)
    assertType.isFalse(false as Equal<false, boolean>)
    assertType.isFalse(false as Equal<false, true>)
    assertType.isFalse(false as Equal<true, false>)
  })

  test('same type is true', () => {
    assertType.isTrue(true as Equal<{ a: 1 }, { a: 1 }>)
  })

  test('different type is false', () => {
    assertType.isFalse(false as Equal<{ a: 1 }, { b: 1 }>)
  })

  test('A subset of B is false', () => {
    assertType.isFalse(false as Equal<{ a: 1 }, { a: 1, b: 1 }>)
  })

  test('B subset of A is false', () => {
    assertType.isFalse(false as Equal<{ a: 1, b: 1 }, { a: 1 }>)
  })

  test('disjoin is false', () => {
    assertType.isFalse(false as Equal<{ b: 1 }, { a: 1 }>)
  })

  test('overlap is false', () => {
    assertType.isFalse(false as Equal<{ a: 1, b: 1 }, { a: 1, c: 2 }>)
  })
})

describe('TypeNotEquals', () => {
  test('boolean', () => {
    assertType.isFalse(false as NotEqual<boolean, boolean>)
    assertType.isFalse(false as NotEqual<true, true>)
    assertType.isFalse(false as NotEqual<false, false>)
    assertType.isTrue(true as NotEqual<boolean, true>)
    assertType.isTrue(true as NotEqual<true, boolean>)
    assertType.isTrue(true as NotEqual<boolean, false>)
    assertType.isTrue(true as NotEqual<false, boolean>)
    assertType.isTrue(true as NotEqual<false, true>)
    assertType.isTrue(true as NotEqual<true, false>)
  })
})
