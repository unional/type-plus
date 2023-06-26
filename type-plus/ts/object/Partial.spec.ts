import { it, test } from '@jest/globals'
import { describe } from 'node:test'
import {
	assertType,
	testType,
	type IsPartialProp,
	type Partial,
	type PartialExcept,
	type PartialOmit,
	type PartialPick
} from '../index.js'

test('work on primitive type', () => {
	type Foo = PartialPick<number, 'toFixed'>
	const x: Foo = 1
	assertType<(typeof x)['toFixed']>(1 as unknown as 1['toFixed'] | undefined)
})

test('make picked properties optional', () => {
	type Foo = {
		a: number
		b: number
		c: number
	}

	const y: PartialPick<Foo, 'a'> = { b: 1, c: 2 }

	y.a = undefined
	assertType.noUndefined(y.b)
	assertType.noUndefined(y.c)
})

test('make not specified properties optional', () => {
	type Foo = {
		a: number
		b: number
		c: number
	}

	const y: PartialExcept<Foo, 'a'> = { a: 1 }
	assertType.noUndefined(y.a)
	y.b = undefined
	y.c = undefined
})

test('make not specified properties optional', () => {
	type Foo = {
		a: number
		b: number
		c: number
	}

	const y: PartialOmit<Foo, 'a'> = { a: 1 }

	assertType.noUndefined(y.a)
	y.b = undefined
	y.c = undefined
})

it('expose Partial', () => {
	testType.equal<Partial<{ a: number }>, { a?: number | undefined }>(true)
})

describe('IsPartialProp', () => {
	it('returns true for partial prop', () => {
		testType.true<IsPartialProp<{ a?: number }, 'a'>>(true)
		testType.true<IsPartialProp<{ a?: number; b: number }, 'a'>>(true)
	})

	it('returns false for non-partial prop', () => {
		testType.false<IsPartialProp<{ a: number }, 'a'>>(true)
		testType.false<IsPartialProp<{ a: number; b?: number }, 'a'>>(true)
	})

	it('supports override', () => {
		testType.equal<IsPartialProp<{ a?: number; b: number }, 'a', 'yes', 'no'>, 'yes'>(true)
		testType.equal<IsPartialProp<{ a?: number; b: number }, 'b', 'yes', 'no'>, 'no'>(true)
	})
})
