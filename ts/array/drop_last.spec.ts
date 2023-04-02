import { testType, type DropLast } from '../index.js'

test('drop from empty gets itself', () => {
	testType.equal<DropLast<string[]>, string[]>(true)
})

test('drop first value type from tuple', () => {
	type Actual = DropLast<[true, 1, 'x', 3]>
	testType.equal<Actual, [true, 1, 'x']>(true)
})

test('drop only value gets never[]', () => {
	type Actual = DropLast<['x']>
	testType.equal<Actual, never[]>(true)
})

test('array type gets itself', () => {
	const s: string[] = ['a', 'b', 'c']
	type Actual = DropLast<typeof s>
	testType.equal<Actual, string[]>(true)
})
