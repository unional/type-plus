import { it } from '@jest/globals'
import { testType, type $Error, type $Never, type $Then, type $ResolveBranch } from '../../index.js'

it('fails never input', () => {
	testType.equal<$ResolveBranch<never>, $Error<'Branches cannot be `never`.', never>>(true)
})

it('fails empty tuple', () => {
	testType.equal<$ResolveBranch<[]>, $Error<'Branches cannot be `[]`.', []>>(true)
})

it('returns first non unknown', () => {
	testType.equal<$ResolveBranch<[unknown, 1]>, 1>(true)
	testType.equal<$ResolveBranch<[unknown, unknown, 1]>, 1>(true)
	testType.equal<$ResolveBranch<[unknown, unknown, unknown, 1]>, 1>(true)
	testType.equal<$ResolveBranch<[unknown, unknown, $Never]>, $Never>(true)
	testType.equal<$ResolveBranch<[$Never, $Then]>, $Never>(true)
	testType.equal<$ResolveBranch<[unknown, $Never, $Then]>, $Never>(true)
})

it('returns last element', () => {
	testType.equal<$ResolveBranch<[1]>, 1>(true)
	testType.equal<$ResolveBranch<[any]>, any>(true)
	testType.equal<$ResolveBranch<[void]>, void>(true)
	testType.equal<$ResolveBranch<[false]>, false>(true)
	testType.equal<$ResolveBranch<[never]>, never>(true)
	testType.equal<$ResolveBranch<[unknown]>, unknown>(true)
})
