import { it } from '@jest/globals'
import { testType, type $Else, type $SelectionBranch, type $Then, type HasUndefined } from '../index.js'

it('returns false when there is no undefined', () => {
	testType.equal<HasUndefined<1 | 2>, false>(true)
})

it('returns true when there is undefined', () => {
	testType.equal<HasUndefined<undefined>, true>(true)
	testType.equal<HasUndefined<undefined | 1>, true>(true)
})

it('can customize behavior', () => {
	testType.equal<HasUndefined<undefined, $SelectionBranch>, $Then>(true)
	testType.equal<HasUndefined<number, $SelectionBranch>, $Else>(true)
})
