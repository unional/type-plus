import { it } from '@jest/globals'
import { testType, type $Any, type $IsBranch } from '../../index.js'

it('detects if type is branch', () => {
	testType.true<$IsBranch<$Any>>(true)
})
