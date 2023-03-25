import { PadLeft, type } from '../index.js'

test('zero length returns the same', () => {
	type.equal<PadLeft<[], 0>, []>(true)
})

test('pad with any by default', () => {
	type.equal<PadLeft<[], 2>,[any, any]>(true)
	type.equal<PadLeft<[1, 2, 3], 5>, [any, any, 1, 2, 3]>(true)
})

test('pad length less than tuple length is ignored', () => {
	type.equal<PadLeft<[1, 2, 3], 2>, [1, 2, 3]>(true)
})

test('pad elements before array', () => {
	type R = PadLeft<string[], 3>
	type.equal<R, [any, any, any, ...string[]]>(true)
})

test('override element to PadWith', () => {
	type.equal<PadLeft<[1, 2, 3], 5, { a: 1 }>, [{ a: 1 }, { a: 1 }, 1, 2, 3]>(true)
})

test('pad and array value type is the same returns array', () => {
	type.equal<PadLeft<string[], 3, string>, string[]>(true)
})
