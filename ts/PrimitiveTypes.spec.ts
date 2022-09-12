import { IsNever, isType } from './index.js'

describe('IsNever<T>', () => {
  it('checks if type is never', () => {
    isType.equal<true, true, IsNever<never>>()
    isType.equal<true, false, IsNever<number>>()
    isType.equal<true, false, IsNever<{ a: number }>>()
    isType.equal<true, false, IsNever<[]>>()
  })
})
