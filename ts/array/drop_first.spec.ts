import { test } from '@jest/globals'
import { testType, type DropFirst } from '../index.js'

test('drop from empty gets itself', () => {
	testType.equal<DropFirst<string[]>, string[]>(true)
})

test('drop first value type from tuple', () => {
	type Actual = DropFirst<[true, 1, 'x', 3]>
	testType.equal<Actual, [1, 'x', 3]>(true)
})

test('drop only value gets never[]', () => {
	type Actual = DropFirst<['x']>
	testType.equal<Actual, never[]>(true)
})

test('array type gets itself', () => {
	const s: string[] = ['a', 'b', 'c']
	type Actual = DropFirst<typeof s>
	testType.equal<Actual, string[]>(true)
})
