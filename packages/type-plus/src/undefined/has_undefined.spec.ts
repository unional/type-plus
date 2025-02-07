import { it } from '@jest/globals'

import { type $Else, type $Selection, type $Then, type HasUndefined, testType } from '../index.js'

it('returns false when there is no undefined', () => {
	testType.equal<HasUndefined<1 | 2>, false>(true)
})

it('returns true when there is undefined', () => {
	testType.equal<HasUndefined<undefined>, true>(true)
	testType.equal<HasUndefined<undefined | 1>, true>(true)
})

it('works as filter', () => {
	testType.equal<HasUndefined<undefined, { selection: 'filter' }>, undefined>(true)
	testType.equal<HasUndefined<undefined | 1, { selection: 'filter' }>, undefined | 1>(true)

	testType.equal<HasUndefined<number, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasUndefined<undefined, $Selection.Branch>, $Then>(true)
	testType.equal<HasUndefined<number, $Selection.Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasUndefined<undefined | 1, { $then: 1 }>, 1>(true)
	testType.equal<HasUndefined<0, { $then: 1 }>, false>(true)

	testType.equal<HasUndefined<undefined | 1, { $else: 2 }>, true>(true)
	testType.equal<HasUndefined<0, { $else: 2 }>, 2>(true)
})
