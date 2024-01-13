import { expect, it } from '@jest/globals'

import { drop, testType } from '../index.js'

it('returns the same tuple if the value does not match any entries in the tuple', () => {
	const a: [1, 2, 3] = [1, 2, 3]
	const r = drop(a, 4)
	expect(r).toEqual([1, 2, 3])
	testType.equal<typeof r, [1, 2, 3]>(true)
})

it('accepts readonly array', () => {
	const a = [1, 2, 3] as const
	const r = drop(a, 2)
	expect(r).toEqual([1, 3])
	testType.equal<typeof r, [1, 3]>(true)
})

it('drops object', () => {
	const a = [{ a: 1 }, { b: 2 }]
	const r = drop(a, a[0])
	expect(r).toEqual([{ b: 2 }])
})

it('array', () => {
	const a = drop([1, 'a', 3, 'b', 4], 'a')
	expect(a).toEqual([1, 3, 'b', 4])
	testType.equal<typeof a, Array<number | string>>(true)
})
it('tuple', () => {
	const a = drop([1, 2, 3, 4] as const, 1 as const)
	expect(a).toEqual([2, 3, 4])
	testType.equal<[2, 3, 4], typeof a>(true)
})

it('drop undefined from tuple', () => {
	const a = drop([1, undefined, 3, undefined, 4] as const, undefined)
	expect(a).toEqual([1, 3, 4])
	testType.equal<[1, 3, 4], typeof a>(true)
})
