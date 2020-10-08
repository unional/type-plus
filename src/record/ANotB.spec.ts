import { ANotB, assertType, BNotA, IsDisjoint, LeftJoin } from '..'

describe('ANotB<A, B>', () => {
  test('same type returns never', () => {
    const actual = { a: 1 } as ANotB<{ a: 1 }, { a: 1 }>
    assertType.isNever(actual)
  })

  test('disjoint returns A', () => {
    type A = { a: 1 }
    const actual = { a: 1 } as ANotB<A, { b: 2 }>
    assertType<A>(actual)
  })

  test('remove properties in B from A', () => {
    type A = { a: 1, b: 2, c: 3 }
    type B = { c: 3, d: 4 }
    const actual = { a: 1 } as ANotB<A, B>

    assertType<Pick<A, 'a' | 'b'>>(actual)
    assertType.isTrue(true as IsDisjoint<B, typeof actual>)
  })

  test('same property different type returns the type in A', () => {
    type A = { a: 1 }
    type B = { a: string }
    const actual = { a: 1 } as ANotB<A, B>
    assertType<A>(actual)
  })
});

describe('BNotA<A, B>', () => {
  test('same type returns never', () => {
    const actual = { a: 1 } as BNotA<{ a: 1 }, { a: 1 }>
    assertType.isNever(actual)
  })

  test('disjoint returns B', () => {
    type A = { a: 1 }
    type B = { b: 2 }
    const actual = { b: 2 } as BNotA<A, B>
    assertType<B>(actual)
  })

  test('remove properties in A from B', () => {
    type A = { c: 3, d: 4 }
    type B = { a: 1, b: 2, c: 3 }
    const actual = { a: 1 } as BNotA<A, B>

    assertType<Pick<B, 'a' | 'b'>>(actual)
    assertType.isTrue(true as IsDisjoint<A, typeof actual>)
  })

  test('same property different type returns the type in B', () => {
    type A = { a: 1 }
    type B = { a: string }
    const actual = { a: 'a' } as BNotA<A, B>
    assertType<B>(actual)
  })
});

describe('LeftJoin', () => {
  test('same type returns A', () => {
    const actual = {} as LeftJoin<{ a: 1 }, { a: 1 }>
    assertType<{ a: 1 }>(actual)
  })

  test('disjoint returns A & B', () => {
    const actual = {} as LeftJoin<{ a: 1 }, { b: 1 }>
    assertType<{ a: 1, b: 1 }>(actual)
  })

  test('replaces property in A with property in B', () => {
    type Orig = { type: 'a' | 'b', value: string }
    const actual = {} as LeftJoin<Orig, { value: number }>
    assertType<{ type: 'a' | 'b', value: number }>(actual)
  })
});
