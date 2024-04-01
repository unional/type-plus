import { it } from '@jest/globals'

import { type KeysOfOptional, testType } from '../index.js'

it('get keys from optional type', () => {
	type X = { o?: { a: string; b: string } }
	type A = KeysOfOptional<X['o']>

	testType.equal<A, 'a' | 'b'>(true)
})
