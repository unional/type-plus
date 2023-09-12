import { describe, expect, it } from '@jest/globals'
import { testType } from './index.js'
import { merge, type Merge } from './merge.js'

describe('Merge', () => {

	it('merges with any -> any', () => {
		testType.equal<Merge<any, any>, any>(true)
		testType.equal<Merge<{ a: 1 }, any>, any>(true)
		testType.equal<Merge<any, { a: 1 }>, any>(true)
	})

	it('merges with never -> never', () => {
		testType.equal<Merge<never, never>, never>(true)
		testType.equal<Merge<{ a: 1 }, never>, never>(true)
		testType.equal<Merge<never, { a: 1 }>, never>(true)
	})

	it('drops unknown', () => {
		testType.equal<Merge<unknown, unknown>, unknown>(true)

		// intersection type drops `unknown`. `Merge<A, B>` follows the same pattern.
		testType.equal<{ a: 1 } & unknown, { a: 1 }>(true)
		testType.equal<Merge<{ a: 1 }, unknown>, { a: 1 }>(true)
		testType.equal<Merge<unknown, { a: 1 }>, { a: 1 }>(true)
	})

	it('merges with undefined -> never', () => {
		testType.equal<Merge<undefined, undefined>, never>(true)

		// intersection with `undefined` gets `never` so that it will be dropped
		testType.equal<{ a: 1 } & undefined, never>(true)
		testType.equal<Merge<{ a: 1 }, undefined>, never>(true)
		testType.equal<Merge<undefined, { a: 1 }>, never>(true)
	})

	it('merges with void -> never', () => {
		testType.equal<Merge<void, void>, never>(true)

		// intersection with `void` SHOULD gets `never` so that it will be dropped.
		// but it is returning `{ a: 1 } & void` instead.
		// @ts-expect-error
		testType.equal<{ a: 1 } & void, never>(true)

		// here we align the behavior with `undefined`
		testType.equal<Merge<{ a: 1 }, void>, never>(true)
		testType.equal<Merge<void, { a: 1 }>, never>(true)
	})

	it('ignore NonComposableTypes', () => {
		testType.equal<{ a: 1 } & string, { a: 1 } & string>(true)
		testType.equal<{ a: 1 } & number, { a: 1 } & number>(true)
		testType.equal<{ a: 1 } & bigint, { a: 1 } & bigint>(true)
		testType.equal<{ a: 1 } & boolean, { a: 1 } & boolean>(true)
		testType.equal<{ a: 1 } & symbol, { a: 1 } & symbol>(true)
		testType.equal<{ a: 1 } & null, never>(true)
		testType.equal<{ a: 1 } & undefined, never>(true)
	})
})

describe(`${merge.name}()`, () => {
	it('joining primitive types to anything will get the primitive type', () => {
		merge(1, true)
		// expect(r).toEqual(true)
	})
	it('', () => {
		const r = merge({ a: 1 } as const, 2)
		testType.equal<typeof r, { readonly a: 1 }>(true)
		expect(r).toEqual({ a: 1 })
	})

	it('returns A if A and B are the same type', () => {
		const a: Record<string, string> = {}
		const b: Record<string, string> = {}
		const r = merge(a, b)
		testType.equal<typeof r, Record<string, string>>(true)
		expect(r).toEqual({})
	})

	it('returns intersection of different record types', () => {
		const a: Record<string, string> = {}
		const b: Record<number, number> = {}
		const r = merge(a, b)
		testType.equal<typeof r, { [k: string]: string } & { [k: number]: number }>(true)
	})

	it('returns intersection of different record types - A ~= B', () => {
		const a: Record<string, string> = {}
		const b: Record<string, number> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: string]: string | number }>(true)
	})

	it('returns intersection of different record types - B > A', () => {
		const a: Record<string, string> = {}
		const b: Record<string | number, number> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: number]: number } & { [k: string]: string | number }>(true)
	})

	it('returns intersection of different record types - A > B', () => {
		const a: Record<string | number, number> = {}
		const b: Record<string, string> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: number]: number } & { [k: string]: string | number }>(true)
	})

	it('returns intersection of different record types - A != B', () => {
		const a: Record<number, number> = {}
		const b: Record<string, string> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: number]: number } & { [k: string]: string }>(true)
	})

	it('returns intersection of Record + specific type', () => {
		const a: Record<string, number> = {}
		const b: { a: string } = { a: 'a' }
		const r = merge(a, b)

		testType.equal<typeof r, Record<string, number> & { a: string }>(true)

		// testType.inspect<typeof r>(t => {
		// 	testType.equal<(typeof t)['a'], string>(true)
		// 	t.a = '123'
		// 	// @ts-expect-error
		// 	t['abc'] = true
		// 	t['def'] = 123
		// })
	})

	it('returns intersection of specific type + Record', () => {
		const a: { a: string } = { a: 'a' }
		const b: Record<string, number> = {}
		const r = merge(a, b)

		testType.equal<typeof r, Record<string, number> & { a: string | number }>(true)

		// testType.inspect<typeof r>(t => {
		// 	testType.equal<(typeof t)['a'], string | number>(true)
		// 	t.a = '123'
		// 	t.a = 123

		// 	// @ts-expect-error
		// 	t['abc'] = true
		// 	t['def'] = 123
		// })
	})
})

// TODO: array merge check
