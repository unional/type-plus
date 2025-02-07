import { it } from '@jest/globals'

import { type $Error, type $Type, testType } from '../../index.js'

it('requires message', () => {
	type R = $Error<'some message'>
	testType.equal<R[$Type.$TypeKey], 'error'>(true)
	testType.equal<R[$Type.$ValueKey]['message'], 'some message'>(true)

	testType.equal<R['message'], 'some message'>(true)
})

it('can provide type', () => {
	type R = $Error<'some message', number>

	testType.equal<R[$Type.$TypeKey], 'error'>(true)
	testType.equal<R[$Type.$ValueKey]['message'], 'some message'>(true)
	testType.equal<R[$Type.$ValueKey]['type'], number>(true)

	testType.equal<R['message'], 'some message'>(true)
	testType.equal<R['type'], number>(true)
})
