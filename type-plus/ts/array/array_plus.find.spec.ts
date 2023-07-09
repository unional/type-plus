import { it, test } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

test('behavior of array.find()', () => {
	const array = [1, 2, '3']
	const r = array.find(x => typeof x === 'number')
	testType.equal<typeof r, number | string | undefined>(true)
})

it('returns never if input is never', () => {
	testType.equal<ArrayPlus.Find<never, number>, never>(true)
})

it('can override the never case', () => {
	testType.equal<ArrayPlus.Find<never, 1, { caseNever: 2 }>, 2>(true)
})

it('returns never if the type in the array does not satisfy the criteria', () => {
	testType.equal<ArrayPlus.Find<string[], number>, never>(true)
})

it('can override no_match case', () => {
	testType.equal<ArrayPlus.Find<number[], string, { caseNotMatch: 'a' }>, 'a'>(true)
})

it('returns T if T satisfies the Criteria', () => {
	testType.equal<ArrayPlus.Find<number[], number>, number>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, number | string>, number | string>(true)
})

it('returns Criteria | undefined if T is a widen type of Criteria', () => {
	testType.equal<ArrayPlus.Find<number[], 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<{ a: number } | { b: number }>, { a: 1 }>, { a: 1 } | undefined>(true)
})

it('can override widen case', () => {
	testType.equal<ArrayPlus.Find<number[], 1, { caseWiden: never }>, never>(true)
})

it('does not support tuple', () => {
	testType.equal<
		ArrayPlus.Find<[true, 1, 'x', 3], number>,
		'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.'>(true)
})

it('returns never if the union type does not satisfy the Criteria', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, boolean>, never>(true)
})

it('returns Criteria if T is a union partially satisfies the Criteria', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, number>, number>(true)
	testType.equal<ArrayPlus.Find<Array<1 | 2 | 'x'>, number>, 1 | 2>(true)
})

it('can override unionNotMach to `undefined`', () => {
	// adding `undefined` to the result better match the behavior in JavaScript,
	// as an array of `Array<string | number>` can contains only `string` or `number`.
	// so `Find<Array<string | number>, string>` returns `string | undefined`.
	testType.equal<ArrayPlus.Find<Array<string | number>, number, { caseUnionNotMatch: undefined }>, number | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<1 | 2 | 'x'>, number, { caseUnionNotMatch: undefined }>, 1 | 2 | undefined>(true)
})

it('handles union not match and widen cases separately', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, 1, {
		caseWiden: 234,
		caseUnionNotMatch: 123
	}>, 123 | 234>(true)
})

it('can override the union_miss case', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, number, { caseUnionNotMatch: never }>, number>(true)
})

it('will not affect other cases', () => {
	testType.equal<ArrayPlus.Find<Array<string | number>, number, { caseNever: 123 }>, number | ArrayPlus.Find.DefaultOptions<unknown>['caseUnionNotMatch']>(true)
	testType.equal<ArrayPlus.Find<never, 1, { caseNotMatch: 123 }>, ArrayPlus.Find.DefaultOptions<unknown>['caseNever']>(true)
	testType.equal<ArrayPlus.Find<number[], string, { caseTuple: 123 }>, ArrayPlus.Find.DefaultOptions<unknown>['caseNotMatch']>(true)
	testType.equal<ArrayPlus.Find<[], 1, { caseWiden: 123 }>, ArrayPlus.Find.DefaultOptions<unknown>['caseTuple']>(true)
	testType.equal<ArrayPlus.Find<number[], 1, { caseUnionNotMatch: 123 }>, ArrayPlus.Find.DefaultOptions<1>['caseWiden']>(true)
})

it('support readonly array', () => {
	testType.equal<ArrayPlus.Find<readonly number[], 1>, 1 | undefined>(true)
})
