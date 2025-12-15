import { describe, it } from 'vitest'

import { type ArrayPlus, type Some, testType } from '../index.js'

it('returns true if array satisfies Criteria', () => {
	testType.true<Some<number[], number>>(true)
	testType.true<Some<string[], string>>(true)
	testType.true<Some<Array<number | string>, number | string>>(true)
	testType.true<Some<string[], string | number>>(true)
	testType.true<Some<string[], any>>(true)
	testType.true<Some<string[], unknown>>(true)
})

it('returns true if one of the array elements satisfies Criteria', () => {
	// `Array<number | string>` really means some values are numbers and others are strings.
	// So when asking "does it has one or more elements that is a number",
	// the answer should be true
	testType.strictBoolean<Some<Array<number | string>, number>>(true)
})

it('returns false if array does not satisfies Criteria', () => {
	testType.false<Some<string[], number>>(true)
})

it('returns false for empty tuple', () => {
	testType.false<Some<[], number>>(true)
	testType.false<Some<[], any>>(true)
	testType.false<Some<[], unknown>>(true)
	testType.false<Some<[], never>>(true)
})

it('returns true when one of the tuple element satisfies Criteria', () => {
	testType.true<Some<['a', 1], 1>>(true)
	testType.true<Some<['a', 1], number>>(true)
	testType.true<Some<['a', 1], 'a'>>(true)
	testType.true<Some<['a', 1], string>>(true)
})

it('returns false when none of the tuple elements satisfies Criteria', () => {
	testType.false<Some<['a', 'b', 'c'], 1>>(true)
})

it('number', () => {
	testType.true<Some<['a', number], number>>(true)
	testType.true<Some<['a', 1], 1>>(true)
	testType.true<Some<['a', 777], 777>>(true)

	testType.false<Some<['a', number], 1>>(true)
	testType.true<Some<['a', 12345], number>>(true)
	testType.true<Some<['a', -12345], number>>(true)
	testType.false<Some<['a', 1], 2>>(true)
})

it('boolean', () => {
	testType.true<Some<['a', boolean], boolean>>(true)
	testType.true<Some<['a', true], true>>(true)
	testType.true<Some<['a', false], false>>(true)

	testType.true<Some<['a', false, boolean], boolean>>(true)
	testType.true<Some<['a', boolean, false], boolean>>(true)
	testType.true<Some<['a', boolean, true], true>>(true)
	testType.true<Some<['a', true, boolean], true>>(true)

	testType.true<Some<['a', true], boolean>>(true)
	testType.true<Some<['a', false], boolean>>(true)
	testType.false<Some<['a', boolean], true>>(true)
	testType.false<Some<['a', boolean], false>>(true)
})

it('string', () => {
	testType.true<Some<[1, 2, 3, string], string>>(true)
	testType.true<Some<[1, 2, 3, 'a'], 'a'>>(true)
	testType.true<Some<[1, 2, 3, 'a', 'a'], 'a'>>(true)

	testType.true<Some<[1, 2, 3, 'a'], string>>(true)
	testType.true<Some<[1, 2, 3, 'a'], string>>(true)
	testType.false<Some<[1, 2, 3, string], 'a'>>(true)
	testType.false<Some<[1, 2, 3, 'a'], 'ab'>>(true)
})

describe('strict mode', () => {
	it('ensure number boolean string does not match literals', () => {
		testType.true<Some<[boolean], boolean, 'strict'>>(true)
		testType.true<Some<[number], number, 'strict'>>(true)
		testType.true<Some<[string], string, 'strict'>>(true)

		testType.false<Some<['a', true], boolean, 'strict'>>(true)
		testType.false<Some<['a', true, false], boolean, 'strict'>>(true)
		testType.false<Some<['a', 1], number, 'strict'>>(true)
		testType.false<Some<[1, 2, 3, 'a'], string, 'strict'>>(true)
	})

	it('typed array', () => {
		testType.true<Some<boolean[], boolean, 'strict'>>(true)
		testType.true<Some<number[], number, 'strict'>>(true)
		testType.true<Some<string[], string, 'strict'>>(true)

		testType.false<Some<true[], boolean, 'strict'>>(true)
		testType.false<Some<1[], number, 'strict'>>(true)
		testType.false<Some<'a'[], string, 'strict'>>(true)
	})

	it('returns true if one of the array elements strictly satisfies Criteria', () => {
		testType.true<Some<Array<number | string>, number | string, 'strict'>>(true)
	})

	it.todo('returns true|boolean? if one of the array elements satisfies Criteria')
	// testType.strictBoolean<Some<Array<number | string>, number, 'strict'>>(true)
})

it('exposes under ArrayPlus.Some', () => {
	testType.equal<ArrayPlus.Some<[1, 2, 3], number>, true>(true)
})

it('support readonly array', () => {
	testType.false<Some<readonly string[], number>>(true)
	testType.equal<ArrayPlus.Some<readonly [1, 2, 3], number>, true>(true)
	testType.false<Some<readonly true[], boolean, 'strict'>>(true)
	testType.true<Some<readonly [boolean], boolean, 'strict'>>(true)
})
