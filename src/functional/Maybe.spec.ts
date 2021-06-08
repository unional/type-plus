import { assertType, CanAssign, canAssign } from '..'
import { Just, just, Maybe, none, None } from './Maybe'

test('just(value) returns Maybe<T>', () => {
  assertType<Maybe<number>>(just(1))
})

test('just(undefined) returns Maybe<T>', () => {
  const b: boolean | undefined = undefined
  assertType<Maybe<boolean>>(just(b))
})

test('none<T>() returns Maybe<T>', () => {
  assertType<Maybe<boolean>>(none<boolean>())
})

test('unwrap Maybe<T> returns value', () => {
  const maybe = just('abc')
  const actual = maybe.unwrap()

  assertType<string>(actual)
  expect(actual).toBe('abc')
})

test('None can assign to Maybe<T>', () => {
  const actual = none<number>()

  assertType.isTrue(true as CanAssign<typeof actual, Maybe<number>>)
  assertType.isTrue(true as CanAssign<None<number>, Maybe<number>>)
  assertType.isTrue(canAssign<Maybe<number>>()(none<number>()))
})

test('Just<number can assign to Maybe<number>', () => {
  assertType.isTrue(true as CanAssign<Just<number>, Maybe<number>>)
  assertType.isTrue(canAssign<Maybe<number>>()(just(1)))
})

test('Just<string> is not assignable to Maybe<number>', () => {
  assertType.isFalse(false as CanAssign<Just<'abc'>, Maybe<number>>)

  // this is failing, which is wrong
  // assertType.isFalse(canAssign<Maybe<number>>()(just('abc')))
})
