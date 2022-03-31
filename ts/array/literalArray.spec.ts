import { isType, literalArray } from '..'

test('entries in array are restricted to the input literals', () => {
  const actual = literalArray('a', 'b')

  isType.equal<true, Array<'a' | 'b'>, typeof actual>()
})
