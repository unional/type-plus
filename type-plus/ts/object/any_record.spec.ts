import { it } from '@jest/globals'
import { testType, type AnyRecord, type KeyTypes } from '../index.js'

it('use as type criteria', () => {

	type X<T extends AnyRecord> = keyof T

	testType.equal<X<{ a: 1 }>, 'a'>(true)

	// This is how TypeScript behaves
	testType.equal<X<never>, KeyTypes>(true)
	// This is what we want it to be
	// @ts-expect-error
	testType.equal<X<never>, never>(true)
})
