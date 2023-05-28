import { test } from '@jest/globals'
import { PadStart, testType } from '../index.js'

test('zero length returns the same', () => {
	testType.equal<PadStart<[], 0>, []>(true)
})

test('pad with any by default', () => {
	testType.equal<PadStart<[], 2>,[any, any]>(true)
	testType.equal<PadStart<[1, 2, 3], 5>, [any, any, 1, 2, 3]>(true)
})

test('pad length less than tuple length is ignored', () => {
	testType.equal<PadStart<[1, 2, 3], 2>, [1, 2, 3]>(true)
})

test('pad elements before array', () => {
	type R = PadStart<string[], 3>
	testType.equal<R, [any, any, any, ...string[]]>(true)
})

test('override element to PadWith', () => {
	testType.equal<PadStart<[1, 2, 3], 5, { a: 1 }>, [{ a: 1 }, { a: 1 }, 1, 2, 3]>(true)
})

test('pad and array value type is the same returns array', () => {
	testType.equal<PadStart<string[], 3, string>, string[]>(true)
})
