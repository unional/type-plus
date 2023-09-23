import { it } from '@jest/globals'
import { testType, type $Error, type $Never, type $Then, type $ResolveOptions } from '../index.js'

it('fails any input', () => {
	testType.equal<$ResolveOptions<any>, $Error<'Values cannot be `any`.', any>>(true)
})

it('fails never input', () => {
	testType.equal<$ResolveOptions<never>, $Error<'Values cannot be `never`.', never>>(true)
})

it('fails empty tuple', () => {
	testType.equal<$ResolveOptions<[]>, $Error<'Values cannot be `[]`.', []>>(true)
})

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
