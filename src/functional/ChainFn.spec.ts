import { ChainFn } from '.'
import { assertType, Equal } from '../assertion'

test('return type is the same as input type', () => {
  type A = ChainFn<number>

  assertType.isTrue(true as Equal<Parameters<A>[0], ReturnType<A>>)
})
