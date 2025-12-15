import { it } from 'vitest'
import { type $Never, type $NotNever, testType } from '../../index.js'

it('$Never and $NotNever is not the same', () => {
	testType.equal<$Never, $NotNever>(false)
})
