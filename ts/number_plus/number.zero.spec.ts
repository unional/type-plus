import { isType } from '../index.js'
import type { Zero } from './number.js'

it('can be 0', () => {
	isType<Zero>(0)
})

it('can be bigint 0n', () => {
	isType<Zero>(0n)
})
