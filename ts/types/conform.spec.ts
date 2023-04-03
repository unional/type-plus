import { expect, test } from '@jest/globals'
import { conform } from './conform.js'
import * as T from './index.js'

test('conform is strict', () => {
	const t = T.tuple.create(T.string)
	expect(conform(t, ['a', 'b', 'c', 'd'])).toBe(false)
})
