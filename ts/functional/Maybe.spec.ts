import { assertType, CanAssign, canAssign, testType } from '../index.js'
import { Just, just, Maybe, none, None } from './Maybe.js'

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

	testType.true<CanAssign<typeof actual, Maybe<number>>>(true)
	testType.true<CanAssign<None<number>, Maybe<number>>>(true)
	assertType.isTrue(canAssign<Maybe<number>>()(none<number>()))
})

test('Just<number can assign to Maybe<number>', () => {
	testType.true<CanAssign<Just<number>, Maybe<number>>>(true)
	assertType.isTrue(canAssign<Maybe<number>>()(just(1)))
})

test('Just<string> is not assignable to Maybe<number>', () => {
	testType.false<CanAssign<Just<'abc'>, Maybe<number>>>(true)

	assertType.isTrue(canAssign<Maybe<number>>(false)(just('abc')))
})
