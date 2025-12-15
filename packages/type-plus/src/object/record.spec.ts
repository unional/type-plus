import { describe, expect, it } from 'vitest'

import { isType, type KeyTypes, type RecordValue, record, testType } from '../index.js'

describe(`${record.name}()`, () => {
	it('creates an empty record with value default to unknown', () => {
		const a = record()
		a[1] = 2
		a['a'] = 'b'
		a[Symbol()] = true
		testType.equal<typeof a, Record<KeyTypes, unknown>>(true)
	})

	it('can specify key and value types', () => {
		const a = record<string, number>()
		// even though the key type is string,
		// by default JavaScript will cast number index to string
		// so TypeScript also allows it.
		a[1] = 2
		a['a'] = 3
		isType.equal<true, Record<string, number>, typeof a>()
	})

	it('has no prototype', () => {
		const a = record()
		expect(Object.getPrototypeOf(a)).toBeNull()
	})

	it('has no prototype with initial value', () => {
		const a = record({ a: 1 })
		expect(Object.getPrototypeOf(a)).toBeNull()
	})

	it('infers type from initial value, the key type is widen', () => {
		const stringRecord = record({ a: 1 })
		isType.equal<true, Record<string, number>, typeof stringRecord>()

		const numberRecord = record({ 1: 3 })
		isType.equal<true, Record<number, number>, typeof numberRecord>()

		const stringConstRecord = record({ a: 1 } as const)
		isType.equal<true, Record<string, 1>, typeof stringConstRecord>()

		const stringConstRecord2 = record({ a: 1 as const })
		isType.equal<true, Record<string, 1>, typeof stringConstRecord2>()

		const stringConstRecord3 = record({ a: 1 as const, b: 'b' })
		isType.equal<true, Record<string, 1 | string>, typeof stringConstRecord3>()

		const stringConstRecord4 = record({ a: 1 as const, b: 'b' as const })
		isType.equal<true, Record<string, 1 | 'b'>, typeof stringConstRecord4>()
	})

	it('has the keys of the initial value', () => {
		const a = record({ a: 1, b: 2 })
		expect(Object.keys(a)).toEqual(['a', 'b'])
	})

	it('can specify a custom record', () => {
		const a = record<{ a: number }>()
		isType.equal<true, { a: number }, typeof a>()

		const b = record<{ b: string }>({ b: 'b' })
		isType.equal<true, { b: string }, typeof b>()
	})
})

describe('RecordValue<R>', () => {
	it('gets the value type from Record<any, T>', () => {
		type R = RecordValue<Record<any, string>>

		isType.equal<true, string, R>()
	})

	it('gets the value type form Record<number, T>', () => {
		type R = RecordValue<Record<number, string>>

		isType.equal<true, string, R>()
	})

	it('gets the value type form Record<number, T>', () => {
		type R = RecordValue<Record<symbol, string>>

		isType.equal<true, string, R>()
	})

	it('works with union type', () => {
		type R = RecordValue<{ a: number } & { b: string }>

		isType.equal<true, number | string, R>()
	})

	it('works with intersect type', () => {
		type R = RecordValue<{ a: number } | { b: string }>

		isType.equal<true, number | string, R>()
	})
})
