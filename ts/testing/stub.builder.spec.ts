import { expect, it } from '@jest/globals'
import { stub, testType } from '../index.js'

it('creates a stub builder with init object', () => {
	const s = stub.builder({ a: 0 }).create()
	const r = s()
	expect(r).toEqual({ a: 0 })
	testType.equal<typeof r, { a: number }>(true)
})

it('creates a stub builder with init function', () => {
	const s = stub.builder<{ a: number }>(input => ({ a: (input?.a ?? 0) + 1 })).create()
	const r = s()
	expect(r).toEqual({ a: 1 })
})

it('can add init object to builder', () => {
	const s = stub.builder<{ a: number; b?: string }>({ a: 1 }).with({ b: '1' }).create()
	const r = s()
	expect(r).toEqual({ a: 1, b: '1' })
})

it('can add init function to builder', () => {
	const s = stub.builder<{ a: number; b?: string }>(input => ({
		...input,
		a: (input?.a ?? 0) + 1 }))
		.with(input => ({
			...input,
			b: (input?.b ?? '0') + '1' }))
		.create()
	expect(s()).toEqual({ a: 1, b: '01' })
	expect(s({ a: 1 })).toEqual({ a: 2, b: '01' })
	expect(s({ a: 1 })).toEqual({ a: 2, b: '01' })
})
