import { isType, Tail } from '..'

test('get tail types', () => {
  type S = [1, 'a', 'b']
  type A = Tail<S>

  isType.equal<true, ['a', 'b'], A>()
})

test('empty tuple gets never', () => {
  type S = []
  type A = Tail<S>

  isType.equal<true, never, A>()
})

test('array gets same type', () => {
  type A = Tail<string[]>

  isType.equal<true, string[], A>()
})

test('union array', () => {
  type A = Tail<Array<string | boolean>>

  isType.equal<true, Array<string | boolean>, A>()
})

test('tuple with rest', () => {
  type A = Tail<[number, ...string[]]>
  isType.equal<true, string[], A>()
})
