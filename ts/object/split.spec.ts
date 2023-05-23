import { expect, test } from '@jest/globals'
import { isType, split, testType } from '../index.js'

const target = { a: 0, b: '', c: false }

test('can use undefined as default', () => {
	const [{ a }] = split(target, { a: undefined })

	isType.equal<true, number, typeof a>()
	expect(a).toBe(0)
})

test('can specify default with the same type', () => {
	const [{ a }] = split(target, { a: 2 })

	isType.equal<true, typeof a, number>()
	expect(a).toBe(0)
})

test('specifying default removes undefined and null from the type', () => {
	type S = { a?: number | null; b: number }
	const s: S = { b: 2 }

	const [{ a }] = split(s, { a: 1 })
	expect(a).toBe(1)

	isType.equal<true, number, typeof a>()
})

test('can default with null', () => {
	const s: { a?: number | null } = {}
	const [{ a }] = split(s, { a: null })

	expect(a).toBe(null)

	isType.equal<true, number | null, typeof a>()
})

test('remove optional/undefined when default is provided', () => {
	interface S {
		variant?: 'abc' | 'def'
	}
	const s: S = {}
	const [a] = split(s, { variant: 'def' })
	testType.equal<typeof a.variant, 'abc' | 'def'>(true)
})

test('keep undefined when default is undefined', () => {
	interface S {
		variant?: 'abc' | 'def'
	}
	const s: S = {}
	const [a] = split(s, { variant: undefined })
	isType.equal<true, 'abc' | 'def' | undefined, typeof a.variant>()
})

test('can default with false', () => {
	const s: { a?: number | boolean } = {}
	const [{ a }] = split(s, { a: false })

	expect(a).toBe(false)

	isType.equal<true, number | boolean, typeof a>()
})

test('can default with empty string', () => {
	const s: { a?: number | null | string } = {}
	const [{ a }] = split(s, { a: '' })

	expect(a).toBe('')

	isType.equal<true, number | string, typeof a>()
})

test('keep falsy value other than undefined and null', () => {
	expect(split({ a: '' }, { a: 'a' })[0].a).toBe('')
	expect(split({ a: false }, { a: true })[0].a).toBe(false)

	expect(split({ a: null as string | null }, { a: 'a' })[0].a).toBe('a')
	expect(split({ a: undefined as string | undefined }, { a: 'a' })[0].a).toBe('a')
})

test('can specify default as one of the intersect types', () => {
	const [a] = split({ a: undefined as number | string | undefined }, { a: '2' })

	isType.equal<true, typeof a, { a: number | string }>()
	expect(a).toEqual({ a: '2' })
})

test('get remaining props in the last entry', () => {
	const [, r] = split(target, { a: undefined })

	isType.equal<true, typeof r, { b: string; c: boolean }>()
	expect(r).toEqual({ b: '', c: false })
})

test('work with simple Record', () => {
	const [a] = split({} as Record<string, string>, { a: 'a' })

	isType.equal<true, typeof a, { a: string }>()
	expect(a).toEqual({ a: 'a' })
})

test('can specify multiple splitters', () => {
	const t = { r: 'r' } as { a?: string; b?: string; c?: string; r?: string }
	const [a, b, c, r] = split(t, { a: 'a' }, { b: 'b' }, { c: 'c' })
	testType.equal<typeof a, { a: string }>(true)
	testType.equal<typeof b, { b: string }>(true)
	testType.equal<typeof c, { c: string }>(true)
	testType.equal<typeof r, { r?: string }>(true)
	expect(a).toEqual({ a: 'a' })
	expect(b).toEqual({ b: 'b' })
	expect(c).toEqual({ c: 'c' })
	expect(r).toEqual({ r: 'r' })
})
