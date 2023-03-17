import { isType, Reverse } from '../index.js'

test('empty array gets itself', () => {
	isType.equal<true, [], Reverse<[]>>()
})

test('array type gets itself', () => {
	isType.equal<true, string[], Reverse<string[]>>()
})

test('single element array gets itself', () => {
	isType.equal<true, [1], Reverse<[1]>>()
})

test('multi elements', () => {
	isType.equal<true, [4, 3, 2, 1], Reverse<[1, 2, 3, 4]>>()
})
