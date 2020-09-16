import { assertType, literalArray } from '.'

test('entries in array are restricted to the input literals', () => {
  const actual = literalArray('a', 'b')

  // the cast is just for assignment. Does not affect type.
  const x: (typeof actual[number]) & 'c' = 'c' as never

  assertType.isNever(x)
})
