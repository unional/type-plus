import { literalArray } from '.';
import { isNever } from './test-util';

test('entries in array are restricted to the input literals', () => {
  const actual = literalArray('a', 'b')

  let y = actual[0]
  // the cast is just for assignment. Does not affect type.
  let x: (typeof y) & 'c' = 1 as never
  isNever(x)
})
