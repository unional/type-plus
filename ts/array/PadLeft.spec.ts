import { isType, PadLeft } from '../index.js'

test('zero length returns the same', () => {
  isType.equal<true, [], PadLeft<[], 0>>()
})

test('pad with any by default', () => {
  isType.equal<true, [any, any], PadLeft<[], 2>>()
  isType.equal<true, [any, any, 1, 2, 3], PadLeft<[1, 2, 3], 5>>()
})

test('pad length less than tuple length is ignored', () => {
  isType.equal<true, [1, 2, 3], PadLeft<[1, 2, 3], 2>>()
})

test('pad elements before array', () => {
  isType.equal<true, [any, any, any, ...string[]], PadLeft<string[], 3>>()
})

test('override PadWith', () => {
  isType.equal<true, [{ a: 1 }, { a: 1 }, 1, 2, 3], PadLeft<[1, 2, 3], 5, { a: 1 }>>()
})

test('pad and array value type is the same returns array', () => {
  isType.equal<true, string[], PadLeft<string[], 3, string>>()
})
