import { Concat, Equal, isType } from '..'

test('concat array', () => {
  type A = Concat<string[], boolean[]>
  isType.true<Equal<Array<string | boolean>, A>>()
})

test('concat tuples', () => {
  type A = Concat<[1, 2, 3], [4, 5]>
  isType.true<Equal<[1, 2, 3, 4, 5], A>>()
})

test('concat array to tuple', () => {
  type A = Concat<string[], [1, 2, 3]>
  isType.true<Equal<Array<string | 1 | 2 | 3>, A>>()
})

test('concat tuple to array', () => {
  type A = Concat<[1, 2, 3], string[]>
  isType.true<Equal<[1, 2, 3, ...string[]], A>>()
})
