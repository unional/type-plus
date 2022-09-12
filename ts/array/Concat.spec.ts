import { Concat, Equal, isType } from '../index.js'

test('concat array', () => {
  type A = Concat<string[], boolean[]>
  isType.t<Equal<Array<string | boolean>, A>>()
})

test('concat tuples', () => {
  type A = Concat<[1, 2, 3], [4, 5]>
  isType.t<Equal<[1, 2, 3, 4, 5], A>>()
})

test('concat array to tuple', () => {
  type A = Concat<string[], [1, 2, 3]>
  isType.t<Equal<[...string[], 1, 2, 3], A>>()
})

test('concat tuple to array', () => {
  type A = Concat<[1, 2, 3], string[]>
  isType.t<Equal<[1, 2, 3, ...string[]], A>>()
})
