import { it, test } from '@jest/globals'
import type { CastToNumeric } from '../index.js'
import { testType } from '../index.js'

test('TypeScript infer floating number with trailing zeros does not work correctly', () => {
	type R<S extends string> = S extends `${infer N extends number}` ? N : never

	testType.equal<R<'1.0'>, 1.0>(false)
})

it(`casts number`, () => {
	testType.equal<CastToNumeric<'123'>, 123>(true)
	testType.equal<CastToNumeric<'0'>, 0>(true)
	testType.equal<CastToNumeric<'-0'>, 0>(true)
	testType.equal<CastToNumeric<'-123'>, -123>(true)
})

it('casts bigint', () => {
	testType.equal<CastToNumeric<'123n'>, 123n>(true)
	testType.equal<CastToNumeric<'0n'>, 0n>(true)
	testType.equal<CastToNumeric<'-0n'>, 0n>(true)
	testType.equal<CastToNumeric<'-123n'>, -123n>(true)
})

it('casts float', () => {
	testType.equal<CastToNumeric<'123.45'>, 123.45>(true)
	testType.equal<CastToNumeric<'0.123'>, 0.123>(true)

	testType.equal<CastToNumeric<'1.1'>, 1.1>(true)
	testType.equal<CastToNumeric<'1.10000'>, 1.1>(true)
	testType.equal<CastToNumeric<'1.0'>, 1>(true)
	testType.equal<CastToNumeric<'1.0000'>, 1>(true)
	testType.equal<CastToNumeric<'0.1'>, 0.1>(true)
	testType.equal<CastToNumeric<'0.1000'>, 0.1>(true)
	testType.equal<CastToNumeric<'0.0'>, 0>(true)
	testType.equal<CastToNumeric<'-0.0'>, 0>(true)
	testType.equal<CastToNumeric<'-0.1000'>, -0.1>(true)
	testType.equal<CastToNumeric<'-0.1'>, -0.1>(true)
	testType.equal<CastToNumeric<'-1.0000'>, -1>(true)
	testType.equal<CastToNumeric<'-1.0'>, -1>(true)
	testType.equal<CastToNumeric<'-1.10000'>, -1.1>(true)
	testType.equal<CastToNumeric<'-1.1'>, -1.1>(true)

	testType.equal<CastToNumeric<'-0.123'>, -0.123>(true)
	testType.equal<CastToNumeric<'-123.45'>, -123.45>(true)
})
