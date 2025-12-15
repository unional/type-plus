import { describe, test } from 'vitest'

import { assertType, isSystemError } from '../index.js'

describe('isSystemError()', () => {
	test('ENOENT', () => {
		const s: unknown = {}
		if (isSystemError('ENOENT', s)) {
			assertType<'ENOENT'>(s.code)
			assertType<string>(s.path)
		}
	})
})
