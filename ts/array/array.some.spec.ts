import { describe, it, test } from '@jest/globals'
import { testType, type Some, ArrayPlus } from '../index.js'

test('empty array', () => {
	testType.false<Some<[], any>>(true)
})

test('typed array', () => {
	testType.true<Some<string[], any>>(true)
	testType.true<Some<string[], string>>(true)
	testType.false<Some<string[], number>>(true)
})

test('contain single returns true', () => {
	testType.true<Some<['a', 1], 1>>(true)
})

test('not contain returns false', () => {
	testType.false<Some<['a', 'b', 'c'], 1>>(true)
})

test('number', () => {
	testType.true<Some<['a', number], number>>(true)
	testType.true<Some<['a', 1], 1>>(true)
	testType.true<Some<['a', 777], 777>>(true)

	testType.false<Some<['a', number], 1>>(true)
	testType.true<Some<['a', 12345], number>>(true)
	testType.true<Some<['a', -12345], number>>(true)
	testType.false<Some<['a', 1], 2>>(true)
})

test('boolean', () => {
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

test('string', () => {
	testType.true<Some<[1, 2, 3, string], string>>(true)
	testType.true<Some<[1, 2, 3, 'a'], 'a'>>(true)
	testType.true<Some<[1, 2, 3, 'a', 'a'], 'a'>>(true)

	testType.true<Some<[1, 2, 3, 'a'], string>>(true)
	testType.true<Some<[1, 2, 3, 'a'], string>>(true)
	testType.false<Some<[1, 2, 3, string], 'a'>>(true)
	testType.false<Some<[1, 2, 3, 'a'], 'ab'>>(true)
})

describe('strict mode', () => {
	test('ensure number boolean string does not match literals', () => {
		testType.true<Some<[boolean], boolean, 'strict'>>(true)
		testType.true<Some<[number], number, 'strict'>>(true)
		testType.true<Some<[string], string, 'strict'>>(true)

		testType.false<Some<['a', true], boolean, 'strict'>>(true)
		testType.false<Some<['a', 1], number, 'strict'>>(true)
		testType.false<Some<[1, 2, 3, 'a'], string, 'strict'>>(true)
	})

	test('typed array', () => {
		testType.true<Some<boolean[], boolean, 'strict'>>(true)
		testType.true<Some<number[], number, 'strict'>>(true)
		testType.true<Some<string[], string, 'strict'>>(true)

		testType.false<Some<true[], boolean, 'strict'>>(true)
		testType.false<Some<1[], number, 'strict'>>(true)
		testType.false<Some<'a'[], string, 'strict'>>(true)
	})
})

it('exposes under ArrayPlus.Some', () => {
	testType.equal<ArrayPlus.Some<[1, 2, 3], number>, true>(true)
})
