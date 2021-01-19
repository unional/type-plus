import { First } from '..'
import { assertType, Equal } from '../assertion'

test('pick first type matching criteria', () => {
  type Actual = First<[true, 1, 'x'], number>
  assertType.isTrue(true as Equal<1, Actual>)
})
