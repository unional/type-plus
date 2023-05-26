import { it } from '@jest/globals'
import { testType } from '../index.js'
import type { PadStart } from './tuple_plus.js'

it('pads with unknown', () => {
	testType.equal<PadStart<[1, 2, 3], 5>, [unknown, unknown, 1, 2, 3]>(true)
})

it('returns source type if total length is less than source length', () => {
	testType.equal<PadStart<[1, 2, 3], 2>, [1, 2, 3]>(true)
})

it('can specify what to pad with', () => {
	testType.equal<PadStart<[1, 2, 3], 5, 0>, [0, 0, 1, 2, 3]>(true)
})
