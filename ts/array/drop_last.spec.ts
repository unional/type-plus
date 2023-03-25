import { type, type DropLast } from '../index.js'

test('drop from empty gets itself', () => {
	type.equal<DropLast<string[]>, string[]>(true)
})

test('drop first value type from tuple', () => {
	type Actual = DropLast<[true, 1, 'x', 3]>
	type.equal<Actual, [true, 1, 'x']>(true)
})

test('drop only value gets never[]', () => {
	type Actual = DropLast<['x']>
	type.equal<Actual, never[]>(true)
})

test('array type gets itself', () => {
	const s: string[] = ['a', 'b', 'c']
	type Actual = DropLast<typeof s>
	type.equal<Actual, string[]>(true)
})
