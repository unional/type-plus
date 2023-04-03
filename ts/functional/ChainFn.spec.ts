import { test } from '@jest/globals'
import { testType, type ChainFn } from '../index.js'

test('return type is the same as input type', () => {
	type A = ChainFn<number>

	testType.equal<Parameters<A>[0], ReturnType<A>>(true)
})
