import { ExtractFunction, extractFunction, isType } from '../index.js'

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

describe(`${extractFunction.name}()`, () => {
  it('adjust type to its function type', () => {
    const fn = Object.assign(() => { }, { a: 1 })

    const r = extractFunction(fn)
    type R = typeof r
    isType.equal<true, () => void, R>()
  })
})
