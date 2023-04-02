import { Filter, KeepMatch, testType } from '../index.js'

describe('Filter<A, C>', () => {
	describe('A is array', () => {
		test('array matching criteria gets itself', () => {
			type Actual = Filter<string[], string>
			testType.equal<string[], Actual>(true)
		})

		test('array not matching criteria gets never[]', () => {
			type Actual = Filter<string[], number>
			testType.equal<never[], Actual>(true)
		})

		test('remove unmatched type form array', () => {
			type Actual = Filter<Array<string | number>, string>

			testType.equal<string[], Actual>(true)
		})

		test('remove undefined and null', () => {
			type Actual = Filter<Array<string | undefined | null>, string>
			testType.equal<string[], Actual>(true)
		})

		test('can filter with undefined and null', () => {
			type Actual = Filter<Array<string | undefined | null>, undefined | null>
			// Array<undefined | null> is destructured to undefined[] | null[] by TypeScript
			testType.equal<undefined[] | null[], Actual>(true)
		})

		test('work with never[]', () => {
			type Actual = Filter<never[], undefined>
			testType.equal<never[], Actual>(true)
		})
	})

	describe(`A is Tuple`, () => {
		test('matching criteria', () => {
			type Actual = Filter<[1, 2, 3, 4], 2 | 4>
			testType.equal<[2, 4], Actual>(true)
		})

		test('no match gets never[]', () => {
			type Actual = Filter<[1, 2, 3, 4], 5>
			testType.equal<never[], Actual>(true)
		})

		test('matching undefined and null', () => {
			type Actual = Filter<[1, undefined, 3, null], undefined | null>
			testType.equal<[undefined, null], Actual>(true)
		})
	})
})

describe('KeepMatch<A, C>', () => {
	describe('A is array', () => {
		test('array matching criteria gets itself', () => {
			type Actual = KeepMatch<string[], string>
			testType.equal<string[], Actual>(true)
		})

		test('array not matching criteria gets never[]', () => {
			type Actual = KeepMatch<string[], number>
			testType.equal<never[], Actual>(true)
		})

		test('remove unmatched type form array', () => {
			type Actual = KeepMatch<Array<string | number>, string>

			testType.equal<string[], Actual>(true)
		})

		test('remove undefined and null', () => {
			type Actual = KeepMatch<Array<string | undefined | null>, string>
			testType.equal<string[], Actual>(true)
		})

		test('can filter with undefined and null', () => {
			type Actual = KeepMatch<Array<string | undefined | null>, undefined | null>
			// Array<undefined | null> is destructured to undefined[] | null[] by TypeScript
			testType.equal<undefined[] | null[], Actual>(true)
		})

		test('work with never[]', () => {
			type Actual = KeepMatch<never[], undefined>
			testType.equal<never[], Actual>(true)
		})
	})

	describe(`A is Tuple`, () => {
		test('matching criteria', () => {
			type Actual = KeepMatch<[1, 2, 3, 4], 2 | 4>
			testType.equal<[2, 4], Actual>(true)
		})

		test('no match gets never[]', () => {
			type Actual = KeepMatch<[1, 2, 3, 4], 5>
			testType.equal<never[], Actual>(true)
		})

		test('matching undefined and null', () => {
			type Actual = KeepMatch<[1, undefined, 3, null], undefined | null>
			testType.equal<[undefined, null], Actual>(true)
		})
	})
})
