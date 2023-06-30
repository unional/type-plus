import { it } from '@jest/globals'
import { testType } from './test_type.js'

it('can inspect type T', () => {
	testType.inspect<{ a: number }>(t => testType.equal<typeof t.value, { a: number }>(true))
})

it('can inspect how T extends various types', () => {
	testType.inspect<123>(({
		extends_1,
		extends_1n,
		extends_a,
		extends_any,
		extends_array_unknown,
		extends_bigint,
		extends_boolean,
		extends_false,
		extends_function,
		extends_never,
		extends_null,
		extends_number,
		extends_object,
		extends_string,
		extends_symbol,
		extends_true,
		extends_tuple_empty,
		extends_undefined,
		extends_unknown,
		extends_void
	}) => {
		testType.false<typeof extends_1>(true)
		testType.false<typeof extends_1n>(true)
		testType.false<typeof extends_a>(true)
		testType.true<typeof extends_any>(true)
		testType.false<typeof extends_array_unknown>(true)
		testType.false<typeof extends_bigint>(true)
		testType.false<typeof extends_boolean>(true)
		testType.false<typeof extends_false>(true)
		testType.false<typeof extends_function>(true)
		testType.false<typeof extends_never>(true)
		testType.false<typeof extends_null>(true)
		testType.true<typeof extends_number>(true)
		testType.false<typeof extends_object>(true)
		testType.false<typeof extends_string>(true)
		testType.false<typeof extends_symbol>(true)
		testType.false<typeof extends_true>(true)
		testType.false<typeof extends_tuple_empty>(true)
		testType.false<typeof extends_undefined>(true)
		testType.true<typeof extends_unknown>(true)
		testType.false<typeof extends_void>(true)
	})
})
