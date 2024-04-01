import { test } from '@jest/globals'

import { type Reverse, testType } from '../index.js'

test('empty array gets itself', () => {
	testType.equal<Reverse<[]>, []>(true)
})

test('array type gets itself', () => {
	testType.equal<Reverse<string[]>, string[]>(true)
})

test('single element array gets itself', () => {
	testType.equal<Reverse<[1]>, [1]>(true)
})

test('multi elements', () => {
	testType.equal<Reverse<[1, 2, 3, 4]>, [4, 3, 2, 1]>(true)
})
