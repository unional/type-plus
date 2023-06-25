import { test } from '@jest/globals'
import { isType, type ValueOf } from '../index.js'

test('work with primitive type', () => {
	type A = ValueOf<string>
	isType.equal<false, never, A>()
})

test('If all values has the same type, the result is of that type', () => {
	const HTTP_METHOD = {
		GET: 'GET',
		POST: 'POST',
		DELETE: 'DELETE',
		PUT: 'PUT'
	}
	type A = ValueOf<typeof HTTP_METHOD>
	isType.equal<true, string, A>()
})

test('If value has multiple types, the result is the union of those types', () => {
	const logLevel = {
		none: '0',
		error: '1',
		warn: 2,
		info: 3,
		debug: 4
	}
	type A = ValueOf<typeof logLevel>
	isType.equal<true, string | number, A>()
})

test('literal types are preserved', () => {
	type L = { a: 1; b: 2; c: 'a'; d: 'b' }
	type A = ValueOf<L>
	isType.equal<true, 1 | 2 | 'a' | 'b', A>()
})
