import { ExtractFunction, extractFunction, isType } from '../index.js'

describe(`ExtraceFunction<T>`, () => {
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

  it('works with intersact functions', () => {
    type F = ((() => string) | ((value: number) => number))
    type T = F & { a: number }
    type R = ExtractFunction<T>

    isType.equal<true, F, R>()
  })
})

describe(`${extractFunction.name}()`, () => {
  it('adjusts type to its function type', () => {
    const fn = Object.assign(() => { }, { a: 1 })

    const r = extractFunction(fn)
    type R = typeof r
    isType.equal<true, () => void, R>()
  })

  it('function overload', () => {
    function foo(v: string): string
    function foo(v: number): number
    function foo(v: unknown) { return v }

    const fn = Object.assign(foo, { a: 1 })
    const r = extractFunction(fn)
    type R = typeof r

    // @ts-expect-error
    isType.equal<true, ((v: string) => string) | ((v: number) => number), R>()
  })
})
