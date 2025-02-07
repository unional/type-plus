import { describe, test } from '@jest/globals'

import { type And, type Not, type Or, type Xor, testType } from '../index.js'

describe('And<A,B>', () => {
	test('basic', () => {
		testType.true<And<true, true>>(true)
		testType.false<And<true, false>>(true)
		testType.false<And<false, true>>(true)
		testType.false<And<false, false>>(true)
	})
	test('boolean special handling', () => {
		testType.equal<And<boolean, true>, boolean>(true)
		testType.false<And<boolean, false>>(true)
		testType.equal<And<true, boolean>, boolean>(true)
		testType.false<And<false, boolean>>(true)
		testType.equal<And<boolean, boolean>, boolean>(true)
	})
})

describe('Or<A,B>', () => {
	test('basic', () => {
		testType.true<Or<true, true>>(true)
		testType.true<Or<true, false>>(true)
		testType.true<Or<false, true>>(true)
		testType.false<Or<false, false>>(true)
	})
	test('boolean special handling', () => {
		testType.true<Or<boolean, true>>(true)
		testType.equal<Or<boolean, false>, boolean>(true)
		testType.true<Or<true, boolean>>(true)
		testType.equal<Or<false, boolean>, boolean>(true)
		testType.equal<Or<boolean, boolean>, boolean>(true)
	})
})

describe('Xor<A,B>', () => {
	test('basic', () => {
		testType.false<Xor<true, true>>(true)
		testType.true<Xor<true, false>>(true)
		testType.true<Xor<false, true>>(true)
		testType.false<Xor<false, false>>(true)
	})
	test('boolean special handling', () => {
		testType.equal<Xor<boolean, true>, boolean>(true)
		testType.equal<Xor<boolean, false>, boolean>(true)
		testType.equal<Xor<true, boolean>, boolean>(true)
		testType.equal<Xor<false, boolean>, boolean>(true)
		testType.equal<Xor<boolean, boolean>, boolean>(true)
	})
})

describe('Not<X>', () => {
	test('basic', () => {
		testType.true<Not<false>>(true)
		testType.false<Not<true>>(true)
	})
	test('boolean special handling', () => {
		testType.equal<Not<boolean>, boolean>(true)
	})
})
