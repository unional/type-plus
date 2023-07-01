import { describe, expect, test } from '@jest/globals'
import { it } from 'node:test'
import { testType } from './index.js'
import { merge, type Merge } from './merge.js'

describe('Merge', () => {

	test('same type returns A', () => {
		testType.equal<Merge<{ a: 1 }, { a: 1 }>, { a: 1 }>(true)
	})

	test('disjoint returns A & B', () => {
		testType.equal<Merge<{ a: 1 }, { b: 1 }>, { a: 1; b: 1 }>(true)
		testType.equal<Merge<{ a: 1 }, { b?: 1 }>, { a: 1; b?: 1 }>(true)
		testType.equal<Merge<{ a?: 1 }, { b: 1 }>, { a?: 1; b: 1 }>(true)
		testType.equal<Merge<{ a?: 1 }, { b?: 1 }>, { a?: 1; b?: 1 }>(true)
	})

	test('replaces property in A with property in B', () => {
		testType.equal<
			Merge<{ type: 'a' | 'b'; value: string }, { value: number }>,
			{ type: 'a' | 'b'; value: number }
		>(true)
	})

	it('removes extra empty {}', () => {
		// testType.equal<
		// 	Merge<{ leaf: { boo(): number } }, { leaf: { foo(): number } }>,
		// 	{ leaf: { boo(): number } | { foo(): number } }
		// >(true)
		testType.equal<Merge<{ leaf: { boo(): number } }, {}>, { leaf: { boo(): number } }>(true)
	})

	it('appends types of optional prop to required prop', () => {
		testType.equal<Merge<{ a: number }, { a?: string | undefined }>, { a: number | string }>(true)
	})

	it('appends types of required prop to optional prop', () => {
		testType.equal<Merge<{ a?: string | undefined }, { a: number }>, { a: number }>(true)
	})

	it('combines type with required and optional props', () => {
		testType.equal<Merge<{ a: number }, { b?: string }>, { a: number; b?: string }>(true)

		type R = Merge<
			{ a: { c: number } },
			{
				a?: { d: string }
			}
		>

		testType.inspect<R>(t => t)
		// testType.equal<R['a'], { c: number } | { d?: string | undefined }>(true)
	})

	it('both optional', () => {
		testType.equal<Merge<{ a?: number }, { a?: string }>, { a?: number | string | undefined }>(true)
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
