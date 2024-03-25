import { test } from '@jest/globals'

import type { AnyConstructor } from '../index.js'

test('basic', () => {
	// biome-ignore lint/complexity/useArrowFunction: on purpose
	const a = (function () { }) as any as AnyConstructor

	new a()
})

test('specify params with tuple', () => {
	// biome-ignore lint/complexity/useArrowFunction: on purpose
	const a = (function () { }) as any as AnyConstructor<[count: number, value: string]>

	new a(1, 'a')
})
