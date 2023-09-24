import { it } from '@jest/globals'
import { testType, type $Else, type $SelectionBranch, type $Then, type HasUndefined } from '../index.js'

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
	testType.equal<HasUndefined<undefined, $SelectionBranch>, $Then>(true)
	testType.equal<HasUndefined<number, $SelectionBranch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasUndefined<undefined | 1, { $then: 1 }>, 1>(true)
	testType.equal<HasUndefined<0, { $then: 1 }>, false>(true)

	testType.equal<HasUndefined<undefined | 1, { $else: 2 }>, true>(true)
	testType.equal<HasUndefined<0, { $else: 2 }>, 2>(true)
})
