import { Just, Maybe, None } from '.'
import { assertType, CanAssign, canAssign, Equal } from '../assertion'

test('Just(T) is Maybe<T>', () => {
  const maybe = Just(1)

  assertType.isTrue(true as Equal<Maybe<number>, typeof maybe>)
})

test('unwrap Just returns value', () => {
  const maybe = Just('abc')
  const actual = maybe.unwrap()

  assertType<string>(actual)
  expect(actual).toBe('abc')
})

test('None can assign to Maybe<T>', () => {
  const none = None<number>()

  assertType.isTrue(true as CanAssign<typeof none, Maybe<number>>)
  assertType.isTrue(canAssign<Maybe<number>>()(None<number>()))
})

test('Just<number can assign to Maybe<number>', () => {
  assertType.isTrue(true as CanAssign<Just<number>, Maybe<number>>)
  assertType.isTrue(canAssign<Maybe<number>>()(Just(1)))
})

test('Just<string> is not assignable to Maybe<number>', () => {
  assertType.isFalse(false as CanAssign<Just<'abc'>, Maybe<number>>)
})
