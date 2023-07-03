import { it } from '@jest/globals'
import { testType, type Head } from '../index.js'

it('gets the type of an array', () => {
	testType.equal<Head<string[]>, string>(true)
})

it('returns the first type of a tuple', () => {
	testType.equal<Head<[1, 'a', 'b']>, 1>(true)
})

it('returns never for empty tuple', () => {
	testType.equal<Head<[]>, never>(true)
})

it('can override empty tuple behavior', () => {
	testType.equal<Head<[], { empty_tuple: undefined }>, undefined>(true)
})
