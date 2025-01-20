import { it } from '@jest/globals'

import { type $Error, type $Type, testType } from '../index.js'

it('requires message', () => {
	type R = $Error<'some message'>
	testType.equal<R[$Type._$type], 'error'>(true)
	testType.equal<R[$Type._$value]['message'], 'some message'>(true)

	testType.equal<R['message'], 'some message'>(true)
})

it('can provide type', () => {
	type R = $Error<'some message', number>

	testType.equal<R[$Type._$type], 'error'>(true)
	testType.equal<R[$Type._$value]['message'], 'some message'>(true)
	testType.equal<R[$Type._$value]['type'], number>(true)

	testType.equal<R['message'], 'some message'>(true)
	testType.equal<R['type'], number>(true)
})
