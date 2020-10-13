import { assertType, IsDisjoint } from '..'

test('disjoint returns true', () => {
  type A = { a: 1 }
  type B = { b: 1 }
  assertType.isTrue(true as IsDisjoint<A, B>)
})

test('same type returns false', () => {
  type A = { a: 1 }
  type B = { a: 1 }
  assertType.isFalse(false as IsDisjoint<A, B>)
})

test('A subset of B returns false', () => {
  type A = { a: 1 }
  type B = { a: 1, b: 1 }
  assertType.isFalse(false as IsDisjoint<A, B>)
})

test('B subset of A returns false', () => {
  type A = { a: 1, b: 1 }
  type B = { a: 1 }
  assertType.isFalse(false as IsDisjoint<A, B>)
})
