import { expect, test } from '@jest/globals'
import { assertType, replaceProperty, type ReplaceProperty } from '../index.js'

test('replaceProperty()', () => {
	const subject = { a: 1, b: 2 } as const
	const actual = replaceProperty(subject, 'a', () => 1)
	assertType<{ a: () => 1, b: 2 }>(actual)
	expect(actual.a()).toBe(1)
})

test('ReplaceProperty<>', () => {
	const subject = { a: 1, b: 2 }

	const actual = subject as ReplaceProperty<typeof subject, 'a', 1>

	assertType<{ a: 1, b: number }>(actual)
})
