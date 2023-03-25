import { type, type Reverse } from '../index.js'

test('empty array gets itself', () => {
	type.equal<Reverse<[]>, []>(true)
})

test('array type gets itself', () => {
	type.equal<Reverse<string[]>, string[]>(true)
})

test('single element array gets itself', () => {
	type.equal<Reverse<[1]>, [1]>(true)
})

test('multi elements', () => {
	type.equal<Reverse<[1, 2, 3, 4]>, [4, 3, 2, 1]>(true)
})
