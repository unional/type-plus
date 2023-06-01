import { it } from '@jest/globals'
import { assertType, Equal, KeysOfOptional } from '../index.js'

it('get keys from optional type', () => {
	type X = { o?: { a: string; b: string } }
	type A = KeysOfOptional<X['o']>

	assertType.isTrue(true as Equal<'a' | 'b', A>)
})
