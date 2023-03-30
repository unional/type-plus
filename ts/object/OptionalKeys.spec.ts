import { assertType, Equal, OptionalKeys } from '../index.js'

test('extract optional keys from object', () => {
	type X = { a?: string; b: string }

	assertType.isTrue(true as Equal<'a', OptionalKeys<X>>)
})
test('work with union type', () => {
	type X = { a?: string; b: string } | { c: string; d?: string }

	type A = OptionalKeys<X>
	assertType.isTrue(true as Equal<'a' | 'd', A>)
})
test('no optional keys returns never', () => {
	type X = { b: string }

	assertType.isTrue(true as Equal<never, OptionalKeys<X>>)
})
test('keys with undefined value is not optional', () => {
	type X = { a: string | undefined }

	assertType.isTrue(true as Equal<never, OptionalKeys<X>>)
})
