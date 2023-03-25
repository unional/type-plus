/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { amend, as, asAny, type } from '../index.js'

describe('as<T>()', () => {
	test('defaults subject type to unknown', () => {
		const s: any = {}
		const a = as(s)
		type.equal<typeof a, unknown>(true)
	})

	test('cast type to T', () => {
		const s: any = {}
		const n = as<number>(s)
		type.equal<typeof n, number>(true)

		const str = as<string>(s)
		type.equal<typeof str, string>(true)

		const o = as<{ a: number }>(s)
		type.equal<typeof o, { a: number }>(true)

		const any = as<any>(s)
		type.equal<typeof any, any>(true)
	})
})

describe('asAny()', () => {
	test('cast type to any', () => {
		const s: unknown = {}
		const a = asAny(s)
		type.equal<typeof a, any>(true)
	})
})

describe('amend<T>()', () => {
	test('assert subject as (subject & T)', () => {
		const s = { a: 1 }
		const a = amend(s).union<{ b: string }>()
		type.equal<typeof a, { a: number } & { b: string }>(true)
	})
	test('assert subject as (subject | T)', () => {
		const s = { a: 1 }
		const a = amend(s).intersect<{ b: string }>()
		type.equal<typeof a, { a: number } | { b: string }>(true)
	})
})
