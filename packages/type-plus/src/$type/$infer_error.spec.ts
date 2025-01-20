import { it } from '@jest/globals'

import { type $InferError, testType } from '../index.js'

it('can specify message only', () => {
	type R = $InferError<'some message'>

	testType.equal<R['_$type'], 'error'>(true)
	testType.equal<R['_$value']['message'], 'Unable to infer: some message'>(true)
})

it('can specify type value', () => {
	type R = $InferError<'some message', { a: { b: { c: { d: { e: { f: { g: number } } } } } } }>
	testType.equal<R['_$value']['type'], { a: { b: { c: { d: { e: { f: { g: number } } } } } } }>(true)
})
