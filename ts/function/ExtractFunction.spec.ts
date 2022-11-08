import { isType } from '../index.js'
import { ExtractFunction } from './ExtractFunction.js'

it('gets the function itself if it is not composite', () => {
  type F = () => void
  type R = ExtractFunction<F>

  isType.equal<true, F, R>()
})

it('omits other props from the type', () => {
  type F = (() => void) & { a: number }
  type R = ExtractFunction<F>

  isType.equal<true, () => void, R>()
})
