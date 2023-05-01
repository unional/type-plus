import { it } from '@jest/globals'
import { stub, testType } from '../index.js'

it('accepts a partial of the requested type', () => {
	function foo(_v: { a: number; b: string }) {}

	foo(stub({ a: 1 }))
})

it('retains param types if the requested type is a function', () => {
	function foo(_v: (a: string, b: number) => boolean) {}

	foo(
		stub((a, b) => {
			testType.equal<typeof a, string>(true)
			testType.equal<typeof b, number>(true)
			return false
		})
	)
})
