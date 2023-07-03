import { it, test } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

test('behavior of array.find()', () => {
	const array = [1, 2, '3']
	const r = array.find(x => typeof x === 'number')
	testType.equal<typeof r, number | string | undefined>(true)
})

it('returns never if the type in the array does not satisfy the criteria', () => {
	testType.equal<ArrayPlus.Find<string[], number>, never>(true)
})

it('returns T if T satisfies the Criteria', () => {
	testType.equal<ArrayPlus.Find<number[], number>, number>(true)
})

it('returns Criteria | undefined if T is a widen type of Criteria', () => {
	testType.equal<ArrayPlus.Find<number[], 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<{ a: number } | { b: number }>, { a: 1 }>, { a: 1 } | undefined>(true)
})

it('does not support tuple', () => {
	testType.equal<
		ArrayPlus.Find<[true, 1, 'x', 3], number>,
		'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.'>(true)
})

it('can override widen case', () => {
	testType.equal<ArrayPlus.Find<number[], 1, { widen: never }>, never>(true)
})

it('returns T | undefined for T[] if T is a union satisfies the Criteria', () => {
	// adding `undefined` to the result better match the behavior in JavaScript,
	// as an array of `Array<string | number>` can contains only `string` or `number`.
	// so `Find<Array<string | number>, string>` returns `string | undefined`.
	testType.equal<ArrayPlus.Find<Array<string | number>, number>, number | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<1 | 2 | 'x'>, number>, 1 | 2 | undefined>(true)
})
