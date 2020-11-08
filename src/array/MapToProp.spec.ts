import { assertType, Equal, MapToProp } from '..'

test('get property from single value tuple', () => {
  type S = [{ a: number }]
  type A = MapToProp<S, 'a'>

  assertType.isTrue(true as Equal<A, number>)
})

test('get property from multiple values', () => {
  type S = [{ a: { x: number } }, { a: { y: string } }]
  type A = MapToProp<S, 'a'>
  assertType.isTrue(true as Equal<A, { x: number } & { y: string }>)
})
