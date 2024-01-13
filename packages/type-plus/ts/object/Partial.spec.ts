import { it, test } from '@jest/globals'

import {
	assertType,
	type Partial,
	type PartialExcept,
	type PartialOmit,
	type PartialPick,
	testType } from '../index.js'

test('work on primitive type', () => {
	type Foo = PartialPick<number, 'toFixed'>
	const x: Foo = 1
	assertType<(typeof x)['toFixed']>(1 as unknown as 1['toFixed'] | undefined)
})

test('make picked properties optional', () => {
	type Foo = {
		a: number,
		b: number,
		c: number
	}

	const y: PartialPick<Foo, 'a'> = { b: 1, c: 2 }

	y.a = undefined
	assertType.noUndefined(y.b)
	assertType.noUndefined(y.c)
})

test('make not specified properties optional', () => {
	type Foo = {
		a: number,
		b: number,
		c: number
	}

	const y: PartialExcept<Foo, 'a'> = { a: 1 }
	assertType.noUndefined(y.a)
	y.b = undefined
	y.c = undefined
})

test('make not specified properties optional', () => {
	type Foo = {
		a: number,
		b: number,
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
