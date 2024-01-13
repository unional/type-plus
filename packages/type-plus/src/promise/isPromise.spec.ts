import { expect, test } from '@jest/globals'

import { isPromise } from '../index.js'

test('false if subject is falsy value or non-object', () => {
	expect(isPromise(undefined)).toBe(false)
	expect(isPromise(null)).toBe(false)
	expect(isPromise(0)).toBe(false)
	expect(isPromise(true)).toBe(false)
	expect(isPromise('a')).toBe(false)
	expect(isPromise([])).toBe(false)
})

test('false if subject does not have a then function', () => {
	expect(isPromise({})).toBe(false)
})

test('false if subject.then is not a function', () => {
	expect(isPromise({ then: true })).toBe(false)
})

test('type guard as promise', () => {
	const subject = {
		then() {
			return true
		}
	}
	if (isPromise(subject)) {
		expect(subject.then()).toBe(true)
	}
})
