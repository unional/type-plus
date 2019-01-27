import { literalArray } from '.';
import { isNever } from './test-util';

test('entries in array are restricted to the input literals', () => {
  const actual = literalArray('a', 'b')

  // the cast is just for assignment. Does not affect type.
  let x: (typeof actual[number]) & 'c' = 'c' as never

  isNever(x)
})
