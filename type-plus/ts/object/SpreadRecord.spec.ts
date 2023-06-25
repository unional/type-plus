import { test } from '@jest/globals'
import { testType, type SpreadRecord } from '../index.js'

test('records are combined as intersection', () => {
	type S = SpreadRecord<{ a: number }, { b: string }>
	testType.equal<S, { a: number } & { b: string }>(true)
})

test('Property in B overrides A', () => {
	type A = { a: number }
	type B = { a: string; b: string }
	type S = SpreadRecord<A, B>

	testType.equal<S, { a: string; b: string }>(true)
})
