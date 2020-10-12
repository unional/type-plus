import { assertType } from './assertType'
import { TypeEquals, TypeNotEquals } from './TypeEquals'

describe('TypeEquals', () => {
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

  test('boolean', () => {
    assertType.isTrue(true as TypeEquals<boolean, boolean>)
    assertType.isTrue(true as TypeEquals<true, true>)
    assertType.isTrue(true as TypeEquals<false, false>)
    assertType.isFalse(false as TypeEquals<boolean, true>)
    assertType.isFalse(false as TypeEquals<true, boolean>)
    assertType.isFalse(false as TypeEquals<boolean, false>)
    assertType.isFalse(false as TypeEquals<false, boolean>)
    assertType.isFalse(false as TypeEquals<false, true>)
    assertType.isFalse(false as TypeEquals<true, false>)
  })
})

describe('TypeNotEquals', () => {
  test('boolean', () => {
    assertType.isFalse(false as TypeNotEquals<boolean, boolean>)
    assertType.isFalse(false as TypeNotEquals<true, true>)
    assertType.isFalse(false as TypeNotEquals<false, false>)
    assertType.isTrue(true as TypeNotEquals<boolean, true>)
    assertType.isTrue(true as TypeNotEquals<true, boolean>)
    assertType.isTrue(true as TypeNotEquals<boolean, false>)
    assertType.isTrue(true as TypeNotEquals<false, boolean>)
    assertType.isTrue(true as TypeNotEquals<false, true>)
    assertType.isTrue(true as TypeNotEquals<true, false>)
  })
})
