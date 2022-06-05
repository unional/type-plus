import { assertType, ChainFn, Equal } from '../index.js'

test('return type is the same as input type', () => {
  type A = ChainFn<number>

  assertType.isTrue(true as Equal<Parameters<A>[0], ReturnType<A>>)
})
