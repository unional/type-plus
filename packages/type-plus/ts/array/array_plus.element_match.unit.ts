import { it } from '@jest/globals'

import { testType } from '../index.js'
import { type ElementMatch } from './array_plus.element_match.js'

it('can disable widen support', () => {
	testType.equal<ElementMatch<number, 1, { widen: false }>, never>(true)
})
