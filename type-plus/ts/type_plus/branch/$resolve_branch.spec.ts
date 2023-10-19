import { it } from '@jest/globals'
import { testType, type $Else, type $Never, type $ResolveBranch, type $SelectionBranch, type $Then } from '../../index.js'

it('returns boolean if selection is predicate', () => {
	testType.equal<$ResolveBranch<123, { selection: 'predicate' }, [$Then]>, true>(true)
	testType.equal<$ResolveBranch<123, { selection: 'predicate' }, [$Else]>, false>(true)
})

it('returns T or never if selection is filter', () => {
	testType.equal<$ResolveBranch<123, { selection: 'filter' }, [$Then]>, 123>(true)
	testType.equal<$ResolveBranch<123, { selection: 'filter' }, [$Else]>, never>(true)
})

it('returns the value in $then or $else over `selection`', () => {
	testType.equal<$ResolveBranch<123, { selection: 'filter', $then: 133 }, [$Then]>, 133>(true)
	testType.equal<$ResolveBranch<123, { selection: 'filter', $else: 133 }, [$Else]>, 133>(true)
	testType.equal<$ResolveBranch<123, { selection: 'predicate', $then: 133 }, [$Then]>, 133>(true)
	testType.equal<$ResolveBranch<123, { selection: 'predicate', $else: 133 }, [$Else]>, 133>(true)
})

it('returns the default value if `$O` does not define any specific branch', () => {
	testType.equal<$ResolveBranch<true, {}, [$Then]>, true>(true)
	testType.equal<$ResolveBranch<true, {}, [$Never, $Else]>, false>(true)
})

it('returns the value of the single specified branch if `$O` defines it', () => {
	testType.equal<$ResolveBranch<true, $SelectionBranch, [$Then]>, $Then>(true)
	testType.equal<$ResolveBranch<false, { $else: 123 }, [$Else]>, 123>(true)
})

it('returns the first matching branch value in `$O`', () => {
	testType.equal<
		$ResolveBranch<123, $SelectionBranch & $Never.$Branch, [$Never, $Else]>,
		$Never
	>(true)
	testType.equal<
		$ResolveBranch<123, $SelectionBranch & { $never: unknown }, [$Never, $Else]>,
		unknown
	>(true)
	testType.equal<
		$ResolveBranch<123, $SelectionBranch, [$Never, $Else]>,
		$Else
	>(true)
})

it('skip over branches that is `unknown`', () => {
	testType.equal<
		$ResolveBranch<123, $SelectionBranch, [unknown, $Else]>,
		$Else
	>(true)
})

it('returns default value if all branches are `unknown`', () => {
	testType.equal<$ResolveBranch<123, {}, [unknown]>, 123>(true)
	testType.equal<$ResolveBranch<123, {}, [unknown, unknown]>, 123>(true)
})

it('returns default value if no match branch and the last branch is unknown', () => {
	testType.equal<$ResolveBranch<123, { $then: 123 }, [$Else, unknown]>, 123>(true)
})
