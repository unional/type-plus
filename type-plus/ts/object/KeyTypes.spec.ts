import { it } from '@jest/globals'
import type { KeyTypes } from '../index.js'

it('contains type of all keys', () => {
	acceptKeys('a')
	acceptKeys(1)
	acceptKeys(Symbol())

	function acceptKeys(k: KeyTypes) {
		return k
	}
})
