import { isType, IsDisjoint } from '..'

test('disjoint returns true', () => {
  type A = { a: 1 }
  type B = { b: 1 }
  isType.true<IsDisjoint<A, B>>()
})

test('same type returns false', () => {
  type A = { a: 1 }
  type B = { a: 1 }
  isType.false<IsDisjoint<A, B>>()
})

test('A subset of B returns false', () => {
  type A = { a: 1 }
  type B = { a: 1, b: 1 }
  isType.false<IsDisjoint<A, B>>()
})

test('B subset of A returns false', () => {
  type A = { a: 1, b: 1 }
  type B = { a: 1 }
  isType.false<IsDisjoint<A, B>>()
})
