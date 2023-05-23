import { test } from '@jest/globals'
import { assertType, testType, type RequiredExcept, type RequiredPick } from '../index.js'

test('make picked properties required', () => {
	type Foo = {
		a?: number | undefined
		b?: number | undefined
		c: number
	}

	const y: RequiredPick<Foo, 'a'> = { a: 1, c: 2 }

	testType.equal<typeof y.a, number>(true)
	y.b = undefined
	testType.equal<typeof y.c, number>(true)
})

test('make not picked properties required', () => {
	type Foo = {
		a?: number | undefined
		b?: number | undefined
		c: number
	}

	const y: RequiredExcept<Foo, 'a'> = { b: 1, c: 2 }

	y.a = undefined
	assertType.noUndefined(y.b)
	assertType.noUndefined(y.c)
})
