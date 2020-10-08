import { assertType, IsSame } from '..'

test('same type is true', () => {
  const y = true as IsSame<{ a: 1 }, { a: 1 }>
  assertType.isTrue(y)
})


test('different type is false', () => {
  const y = false as IsSame<{ a: 1 }, { b: 1 }>
  assertType.isFalse(y)
})

test('A subset of B is false', () => {
  const y = false as IsSame<{ a: 1 }, { a: 1, b: 1 }>
  assertType.isFalse(y)
})

test('B subset of A is false', () => {
  const y = false as IsSame<{ a: 1, b: 1 }, { a: 1 }>
  assertType.isFalse(y)
})

test('disjoin is false', () => {
  const y = false as IsSame<{ b: 1 }, { a: 1 }>
  assertType.isFalse(y)
})

test('overlap is false', () => {
  const y = false as IsSame<{ a: 1, b: 1 }, { a: 1, c: 2 }>
  assertType.isFalse(y)
})
