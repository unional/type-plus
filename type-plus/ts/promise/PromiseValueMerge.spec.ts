import { test } from '@jest/globals'

import { assertType, type PromiseValueMerge } from '../index.js'

test('merge promise value', async () => {
	const result = {} as PromiseValueMerge<Promise<{ a: string }>, Promise<{ b: string }>>
	const value = await result
	assertType<{ a: string, b: string }>(value)
})
