import { typeOverrideIncompatible } from '.';

test('same type override has no property', () => {
  type A = { a: 1 }
  const transform = typeOverrideIncompatible<A>()

  // TODO: find a way to assert `override` has no property
  transform({ a: 1 }, {})
})

test('disjoint type override is A', () => {
  type A = { a: 1 }
  const transform = typeOverrideIncompatible<A>()

  transform({ b: 2 }, { a: 1 })
})

test('intersect type override is ANotB', () => {
  const a = { a: 1, b: 2 } as const
  const b = { b: 3, c: 3 } as const
  const transform = typeOverrideIncompatible<typeof a>()

  transform(b, { a: 1, b: 2 })
})
