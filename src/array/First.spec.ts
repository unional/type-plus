import { First } from '..'
import { assertType, Equal } from '../assertion'

test('pick first type matching criteria', () => {
  type Actual = First<[true, 1, 'x'], number>
  assertType.isTrue(true as Equal<1, Actual>)
})

test('no match gets never', () => {
  type Actual = First<[true, 1, 'x'], 2>
  assertType.isTrue(true as Equal<never, Actual>)
})

test('pick object', () => {
  type Actual = First<[
    { name: 'a', type: 1 },
    { name: 'b', type: 2 },
    { name: 'c', type: 3 }], { name: 'b' }>['type']
  assertType.isTrue(true as Equal<2, Actual>)
})
