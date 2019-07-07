import { ANotB, assertType, BNotA, IsDisjoint } from '.';

describe('ANotB<A, B>', () => {
  test('same type returns never', () => {
    let actual = { a: 1 } as ANotB<{ a: 1 }, { a: 1 }>
    assertType.isNever(actual)
  })

  test('disjoint returns A', () => {
    type A = { a: 1 }
    let actual = { a: 1 } as ANotB<A, { b: 2 }>
    assertType<A>(actual)
  })

  test('remove properties in B from A', () => {
    type A = { a: 1, b: 2, c: 3 }
    type B = { c: 3, d: 4 }
    let actual = { a: 1 } as ANotB<A, B>

    assertType<Pick<A, 'a' | 'b'>>(actual)
    assertType.isTrue(false as IsDisjoint<B, typeof actual>)
  })

  test('same property different type returns the type in A', () => {
    type A = { a: 1 }
    type B = { a: string }
    let actual = { a: 1 } as ANotB<A, B>
    assertType<A>(actual)
  })
});

describe('BNotA<A, B>', () => {
  test('same type returns never', () => {
    let actual = { a: 1 } as BNotA<{ a: 1 }, { a: 1 }>
    assertType.isNever(actual)
  })

  test('disjoint returns B', () => {
    type A = { a: 1 }
    type B = { b: 2 }
    let actual = { b: 2 } as BNotA<A, B>
    assertType<B>(actual)
  })

  test('remove properties in A from B', () => {
    type A = { c: 3, d: 4 }
    type B = { a: 1, b: 2, c: 3 }
    let actual = { a: 1 } as BNotA<A, B>

    assertType<Pick<B, 'a' | 'b'>>(actual)
    assertType.isTrue(false as IsDisjoint<A, typeof actual>)
  })

  test('same property different type returns the type in B', () => {
    type A = { a: 1 }
    type B = { a: string }
    let actual = { a: 'a' } as BNotA<A, B>
    assertType<B>(actual)
  })
});
