import { type, type DropFirst } from '../index.js'

test('drop from empty gets itself', () => {
	type.equal<DropFirst<string[]>, string[]>(true)
})

test('drop first value type from tuple', () => {
	type Actual = DropFirst<[true, 1, 'x', 3]>
	type.equal<Actual, [1, 'x', 3]>(true)
})

test('drop only value gets never[]', () => {
	type Actual = DropFirst<['x']>
	type.equal<Actual, never[]>(true)
})

test('array type gets itself', () => {
	const s: string[] = ['a', 'b', 'c']
	type Actual = DropFirst<typeof s>
	type.equal<Actual, string[]>(true)
})
