import { assertType, IsEqual, KeysOfOptional } from '../index.js'

test('get keys from optional type', () => {
  type X = { o?: { a: string, b: string } }
  type A = KeysOfOptional<X['o']>

  assertType.isTrue(true as IsEqual<'a' | 'b', A>)
})
