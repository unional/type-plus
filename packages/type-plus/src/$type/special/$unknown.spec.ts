import { it } from '@jest/globals'
import { type $Type, type $Unknown, testType } from '../../index.js'

it('is a unique branch', () => {
	testType.canAssign<$Type<'branch', 'something else'>, $Unknown>(false)
})
