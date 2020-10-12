import { assertType, CanAssign } from '..'

describe('CanAssign<A, B>', () => {
  test('literal type to widen', () => {
    assertType.isTrue(true as CanAssign<1, number>)
    assertType.isTrue(true as CanAssign<'a', string>)
    assertType.isTrue(true as CanAssign<false, boolean>)
    assertType.isTrue(true as CanAssign<true, boolean>)
  })
  test('base type to literal type fails', () => {
    assertType.isFalse(false as CanAssign<number, 1>)
    assertType.isFalse(false as CanAssign<string, 'a'>)
    assertType.isFalse(false as CanAssign<boolean, false>)
    assertType.isFalse(false as CanAssign<boolean, true>)
  })
  test('super set to sub set', () => {
    assertType.isTrue(true as CanAssign<{ a: string, b: number }, { a: string }>)
  })
  test('sub set to super set fail', () => {
    assertType.isFalse(false as CanAssign<{ a: string }, { a: string, b: number }>)
  })
})
