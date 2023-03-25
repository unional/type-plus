import { type, type Some } from '../index.js'

test('empty array', () => {
	type.false<Some<[], any>>(true)
})

test('typed array', () => {
	type.true<Some<string[], any>>(true)
	type.true<Some<string[], string>>(true)
	type.false<Some<string[], number>>(true)
})

test('contain single returns true', () => {
	type.true<Some<['a', 1], 1>>(true)
})

test('not contain returns false', () => {
	type.false<Some<['a', 'b', 'c'], 1>>(true)
})

test('number', () => {
	type.true<Some<['a', number], number>>(true)
	type.true<Some<['a', 1], 1>>(true)
	type.true<Some<['a', 777], 777>>(true)

	type.false<Some<['a', number], 1>>(true)
	type.true<Some<['a', 12345], number>>(true)
	type.true<Some<['a', -12345], number>>(true)
	type.false<Some<['a', 1], 2>>(true)
})

test('boolean', () => {
	type.true<Some<['a', boolean], boolean>>(true)
	type.true<Some<['a', true], true>>(true)
	type.true<Some<['a', false], false>>(true)

	type.true<Some<['a', false, boolean], boolean>>(true)
	type.true<Some<['a', boolean, false], boolean>>(true)
	type.true<Some<['a', boolean, true], true>>(true)
	type.true<Some<['a', true, boolean], true>>(true)

	type.true<Some<['a', true], boolean>>(true)
	type.true<Some<['a', false], boolean>>(true)
	type.false<Some<['a', boolean], true>>(true)
	type.false<Some<['a', boolean], false>>(true)
})

test('string', () => {
	type.true<Some<[1, 2, 3, string], string>>(true)
	type.true<Some<[1, 2, 3, 'a'], 'a'>>(true)
	type.true<Some<[1, 2, 3, 'a', 'a'], 'a'>>(true)

	type.true<Some<[1, 2, 3, 'a'], string>>(true)
	type.true<Some<[1, 2, 3, 'a'], string>>(true)
	type.false<Some<[1, 2, 3, string], 'a'>>(true)
	type.false<Some<[1, 2, 3, 'a'], 'ab'>>(true)
})

describe('strict mode', () => {
	test('ensure number boolean string does not match literals', () => {
		type.true<Some<[boolean], boolean, 'strict'>>(true)
		type.true<Some<[number], number, 'strict'>>(true)
		type.true<Some<[string], string, 'strict'>>(true)

		type.false<Some<['a', true], boolean, 'strict'>>(true)
		type.false<Some<['a', 1], number, 'strict'>>(true)
		type.false<Some<[1, 2, 3, 'a'], string, 'strict'>>(true)
	})

	test('typed array', () => {
		type.true<Some<boolean[], boolean, 'strict'>>(true)
		type.true<Some<number[], number, 'strict'>>(true)
		type.true<Some<string[], string, 'strict'>>(true)

		type.false<Some<true[], boolean, 'strict'>>(true)
		type.false<Some<1[], number, 'strict'>>(true)
		type.false<Some<'a'[], string, 'strict'>>(true)
	})
})
