import { it } from '@jest/globals'
import { type Abs, testType } from '../index.js'

it('returns N if N is positive number', () => {
	testType.equal<Abs<1>, 1>(true)
	testType.equal<Abs<12345678901234>, 12345678901234>(true)
})

it(`returns N if N is positive bigint`, () => {
	testType.equal<Abs<1n>, 1n>(true)
	testType.equal<Abs<12345678901234n>, 12345678901234n>(true)
})

it('returns abs N if N is negative number', () => {
	testType.equal<Abs<-1234>, 1234>(true)
})

it('returns abs N if N is negative bigint', () => {
	testType.equal<Abs<-1234n>, 1234n>(true)
})

it('number returns Fail', () => {
	testType.equal<Abs<number>, never>(true)
})

it('returns Fail if N is bigint type', () => {
	testType.equal<Abs<bigint>, never>(true)
})

it('can override Fail case', () => {
	testType.equal<Abs<number, 0>, 0>(true)
	testType.equal<Abs<bigint, 'ha'>, 'ha'>(true)
})
