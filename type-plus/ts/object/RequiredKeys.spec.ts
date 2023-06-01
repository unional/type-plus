import { test } from '@jest/globals'
import { assertType, Equal, RequiredKeys } from '../index.js'

test('extract required keys from object', () => {
	type X = { a?: string; b: string }

	type A = RequiredKeys<X>
	assertType.isTrue(true as Equal<'b', A>)
})
test('work with union type', () => {
	type X = { a?: string; b: string } | { c: string; d?: string }

	type A = RequiredKeys<X>
	assertType.isTrue(true as Equal<'b' | 'c', A>)
})
test('no required keys returns never', () => {
	type X = { b?: string }

	assertType.isTrue(true as Equal<never, RequiredKeys<X>>)
})
test('keys with undefined value is required', () => {
	type X = { a: string | undefined }

	assertType.isTrue(true as Equal<'a', RequiredKeys<X>>)
})
