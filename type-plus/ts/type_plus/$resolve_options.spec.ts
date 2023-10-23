import { it } from '@jest/globals'

import { type $Never, type $ResolveOptions, type $Then,testType } from '../index.js'

it('returns first non unknown', () => {
	testType.equal<$ResolveOptions<[unknown, 1]>, 1>(true)
	testType.equal<$ResolveOptions<[unknown, unknown, 1]>, 1>(true)
	testType.equal<$ResolveOptions<[unknown, unknown, unknown, 1]>, 1>(true)
	testType.equal<$ResolveOptions<[unknown, unknown, $Never]>, $Never>(true)
	testType.equal<$ResolveOptions<[$Never, $Then]>, $Never>(true)
	testType.equal<$ResolveOptions<[unknown, $Never, $Then]>, $Never>(true)
})

it('returns last element', () => {
	testType.equal<$ResolveOptions<[1]>, 1>(true)
	testType.equal<$ResolveOptions<[any]>, any>(true)
	testType.equal<$ResolveOptions<[void]>, void>(true)
	testType.equal<$ResolveOptions<[false]>, false>(true)
	testType.equal<$ResolveOptions<[never]>, never>(true)
	testType.equal<$ResolveOptions<[unknown]>, unknown>(true)
})
