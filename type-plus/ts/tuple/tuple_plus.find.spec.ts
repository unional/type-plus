import { it, test } from '@jest/globals'
import { testType, type TuplePlus } from '../index.js'

test('behavior of tuple.find()', () => {
	const tuple: [1, 2, '3'] = [1, 2, '3']
	const r = tuple.find(x => typeof x === 'number')
	testType.equal<typeof r, 1 | 2 | '3' | undefined>(true)
})

it('returns never if input is never', () => {
	testType.equal<TuplePlus.Find<never, number>, never>(true)
})

it('can override the never case', () => {
	testType.equal<TuplePlus.Find<never, 1, { caseNever: 2 }>, 2>(true)
})

it('returns never for empty tuple', () => {
	testType.equal<TuplePlus.Find<[], number>, never>(true)
})

it('can override empty tuple case', () => {
	testType.equal<TuplePlus.Find<[], number, { caseEmptyTuple: 1 }>, 1>(true)
})

it('does not work with array type', () => {
	testType.equal<TuplePlus.Find<string[], number>, 'does not support array. Please use `FindFirst` or `ArrayPlus.Find` instead.'>(true)
})

it('can override array case', () => {
	testType.equal<TuplePlus.Find<string[], number, { caseArray: 1 }>, 1>(true)
})

it('no match gets never', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x'], 2>, never>(true)
})

it('can override no_match case', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x'], 2, { caseNotMatch: 1 }>, 1>(true)
})

it('pick first type matching criteria', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], 1>, 1>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], 'x'>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], true>, true>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], false>, never>(true)
})

it('uses widen type to match literal types', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], number>, 1>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], string>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], boolean>, true>(true)
})

it('returns Criteria | undefined if T is a widen type of Criteria', () => {
	testType.equal<TuplePlus.Find<[number, 1, 2], 1>, 1 | undefined>(true)
	testType.equal<TuplePlus.Find<[string | number], 1>, 1 | undefined>(true)
	testType.equal<TuplePlus.Find<[{ a: number } | { b: number }], { a: 1 }>, { a: 1 } | undefined>(true)
})

it('can override widen case', () => {
	testType.equal<TuplePlus.Find<[number, string], 1, { caseWiden: 12 }>, 12>(true)
})

it('can disable widen', () => {
	testType.equal<TuplePlus.Find<[number], 1, { widen: false }>, never>(true)
})

it('returns Criteria if T is a union partially satisfies the Criteria', () => {
	testType.equal<TuplePlus.Find<[string | number], number>, number>(true)
})

it('can return T | undefined by overriding unionNotMach to `undefined`', () => {
	// adding `undefined` to the result better match the behavior in JavaScript,
	// as an array of `Array<string | number>` can contains only `string` or `number`.
	// so `Find<Array<string | number>, string>` returns `string | undefined`.
	testType.equal<TuplePlus.Find<[string | number], number, { caseUnionNotMatch: undefined }>, number | undefined>(true)
})

it('pick object', () => {
	type Actual = TuplePlus.Find<
		[{ name: 'a', type: 1 }, { name: 'b', type: 2 }, { name: 'c', type: 3 }, { name: 'b', type: 4 }],
		{ name: 'b' }
	>['type']
	testType.equal<Actual, 2>(true)
})
