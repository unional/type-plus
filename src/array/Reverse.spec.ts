import { Reverse } from '..'
import { isType } from '../assertion'

test('empty array gets itself', () => {
  isType.equal<true, [], Reverse<[]>>()
})

test('single element array gets itself', () => {
  isType.equal<true, [1], Reverse<[1]>>()
})

test('multi elements', () => {
  isType.equal<true, [4, 3, 2, 1], Reverse<[1, 2, 3, 4]>>()
})
