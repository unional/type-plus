import { describe, test } from '@jest/globals'
import { testType, type And, type IsEqual, type Not, type Or, type Xor } from '../index.js'

describe('And<A,B>', () => {
	test('basic', () => {
		testType.true<And<true, true>>(true)
		testType.false<And<true, false>>(true)
		testType.false<And<false, true>>(true)
		testType.false<And<false, false>>(true)
	})
	test('boolean special handling', () => {
		testType.true<IsEqual<And<boolean, true>, boolean>>(true)
		testType.false<And<boolean, false>>(true)
		testType.true<IsEqual<And<true, boolean>, boolean>>(true)
		testType.false<And<false, boolean>>(true)
		testType.true<IsEqual<And<boolean, boolean>, boolean>>(true)
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
		testType.true<IsEqual<Or<boolean, false>, boolean>>(true)
		testType.true<Or<true, boolean>>(true)
		testType.true<IsEqual<Or<false, boolean>, boolean>>(true)
		testType.true<IsEqual<Or<boolean, boolean>, boolean>>(true)
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
		testType.true<IsEqual<Xor<boolean, true>, boolean>>(true)
		testType.true<IsEqual<Xor<boolean, false>, boolean>>(true)
		testType.true<IsEqual<Xor<true, boolean>, boolean>>(true)
		testType.true<IsEqual<Xor<false, boolean>, boolean>>(true)
		testType.true<IsEqual<Xor<boolean, boolean>, boolean>>(true)
	})
})

describe('Not<X>', () => {
	test('basic', () => {
		testType.true<Not<false>>(true)
		testType.false<Not<true>>(true)
	})
	test('boolean special handling', () => {
		testType.true<IsEqual<Not<boolean>, boolean>>(true)
	})
})
