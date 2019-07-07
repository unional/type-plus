import { assertType } from './assertType';
import { IsDisjoint } from './IsDisjoint';

test('disjoint returns true', () => {
  type A = { a: 1 }
  type B = { b: 1 }
  let actual = false as IsDisjoint<A, B>
  assertType.isTrue(actual)
})

test('same type returns false', () => {
  type A = { a: 1 }
  type B = { a: 1 }
  let actual = false as IsDisjoint<A, B>
  assertType.isFalse(actual)
})

test('A subset of B returns false', () => {
  type A = { a: 1 }
  type B = { a: 1, b: 1 }
  let actual = false as IsDisjoint<A, B>
  assertType.isFalse(actual)
})

test('B subset of A returns false', () => {
  type A = { a: 1, b: 1 }
  type B = { a: 1 }
  let actual = false as IsDisjoint<A, B>
  assertType.isFalse(actual)
})
