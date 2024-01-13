import { test } from '@jest/globals'

import { type AnyFunction,assertType } from '../index.js'

test('basic', () => {
	function doCallback(cb: AnyFunction) {
		cb()
	}

	doCallback(() => {})
	doCallback(_ => {})
	doCallback((a: number, b: number) => a + b)
})

test('define param as tuple', () => {
	const foo: AnyFunction<[number, string]> = x => x
	foo(1, 'a')
})

test('define result type', () => {
	const foo: AnyFunction<string[], string> = x => x
	assertType.isString(foo('a'))
})
