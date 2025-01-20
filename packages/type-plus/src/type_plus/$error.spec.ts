import { it } from '@jest/globals'

import { type $Error, testType } from '../index.js'

it('requires message', () => {
	type R = $Error<'some message'>
	testType.equal<R['type'], 'error'>(true)
	testType.equal<R['message'], 'some message'>(true)
})

it('can provide type', () => {
	type R = $Error<'some message', number>
	testType.equal<R['type'], 'error'>(true)
	testType.equal<R['message'], 'some message'>(true)
	testType.equal<R['value'], number>(true)
})
