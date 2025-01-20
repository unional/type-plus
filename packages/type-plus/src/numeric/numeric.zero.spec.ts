import { it } from '@jest/globals'

import { type Zero, isType } from '../index.js'

it('can be 0', () => {
	isType<Zero>(0)
})

it('can be bigint 0n', () => {
	isType<Zero>(0n)
})
