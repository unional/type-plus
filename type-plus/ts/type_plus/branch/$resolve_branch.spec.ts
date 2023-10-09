import { it } from '@jest/globals'
import { testType, type $Else, type $Never, type $NeverBranch, type $ResolveBranch, type $SelectionBranch, type $Then } from '../../index.js'

it('returns the default value if `$O` does not define any specific branch', () => {
	testType.equal<$ResolveBranch<{}, [$Then], true>, true>(true)
	testType.equal<$ResolveBranch<{}, [$Never, $Else], 123>, 123>(true)
	testType.equal<$ResolveBranch<{ $else: 123 }, [$Then], true>, true>(true)
})

it('returns the value of the single specified branch if `$O` defines it', () => {
	testType.equal<$ResolveBranch<$SelectionBranch, [$Then], true>, $Then>(true)
	testType.equal<$ResolveBranch<{ $else: 123 }, [$Else], false>, 123>(true)
})

it('returns the first matching branch value in `$O`', () => {
	testType.equal<
		$ResolveBranch<$SelectionBranch & $NeverBranch, [$Never, $Else], 123>,
		$Never
	>(true)
	testType.equal<
		$ResolveBranch<$SelectionBranch & { $never: unknown }, [$Never, $Else], 123>,
		unknown
	>(true)
	testType.equal<
		$ResolveBranch<$SelectionBranch, [$Never, $Else], 123>,
		$Else
	>(true)
})

it('skip over branches that is `unknown`', () => {
	testType.equal<
		$ResolveBranch<$SelectionBranch, [unknown, $Else], 123>,
		$Else
	>(true)
})

it('returns default value if all branches are `unknown`', () => {
	testType.equal<$ResolveBranch<{}, [unknown], 123>, 123>(true)
	testType.equal<$ResolveBranch<{}, [unknown, unknown], 123>, 123>(true)
})

it('returns default value if no match branch and the last branch is unknown', () => {
	testType.equal<$ResolveBranch<{ $then: 123 }, [$Else, unknown], 123>, 123>(true)
})
