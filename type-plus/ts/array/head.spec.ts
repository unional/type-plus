import { it } from '@jest/globals'
import { testType, type Head } from '../index.js'

it('returns never for empty tuple', () => {
	testType.equal<Head<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<Head<never, { caseNever: 1 }>, 1>(true)
})

it('gets the type of an array', () => {
	testType.equal<Head<string[]>, string>(true)
})

it('returns the first type of a tuple', () => {
	testType.equal<Head<[1, 'a', 'b']>, 1>(true)
})

it('returns never for empty tuple', () => {
	testType.equal<Head<[]>, never>(true)
})

it('can override empty tuple case', () => {
	testType.equal<Head<[], { caseEmptyTuple: undefined }>, undefined>(true)
})
