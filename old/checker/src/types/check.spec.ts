import { expect, test } from '@jest/globals'
import { check } from './check.js'
import * as T from './index.js'

test('check without strict', () => {
	const t = T.tuple.create(T.string)
	expect(check({ strict: false }, t, ['a', 'b', 'c', 'd'])).toBe(true)
})

test('check with strict', () => {
	const t = T.tuple.create(T.string)
	expect(check({ strict: true }, t, ['a', 'b', 'c', 'd'])).toBe(false)
})
