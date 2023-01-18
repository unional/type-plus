import { context, isType } from '../index.js'

describe(`${context.name}()`, () => {
  it('allows no param', () => {
    const r = context().build()
    expect(r).toEqual({})
  })

  it('accepts an initial context value', () => {
    const r = context({ a: 1 }).build()
    isType.equal<true, { a: number }, typeof r>()
    expect(r).toEqual({ a: 1 })
  })

  it('accepts an initializer', () => {
    const r = context(() => ({ a: 1 })).build()
    isType.equal<true, { a: number }, typeof r>()
    expect(r).toEqual({ a: 1 })
  })

  it('accepts transformer expecting Init', () => {
    const r = context({ a: 1 })
      .extend(ctx => {
        isType.equal<true, { a: number }, typeof ctx>()
        expect(ctx).toEqual({ a: 1 })
        return { b: ctx.a + 1 }
      })
      .build()

    isType.equal<true, { a: number, b: number }, typeof r>()
    expect(r).toEqual({ a: 1, b: 2 })
  })

  it('provides the combined context to the next transformer', () => {
    const r = context({ a: 1 })
      .extend(ctx => ({ b: ctx.a + 1 }))
      .extend(ctx => ({ c: ctx.a + ctx.b }))
      .build()

    isType.equal<true, { a: number, b: number, c: number }, typeof r>()
    expect(r).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('accepts extenders needing partial of current context', () => {
    function foo(ctx: { a: number }) {
      return { c: ctx.a + 2 }
    }
    const r = context({ a: 1, b: 2 }).extend(foo).build()

    isType.equal<true, { a: number, b: number, c: number }, typeof r>()
    expect(r).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('can specify additional type during extend', () => {
    const r = context({ a: 1 })
      .extend<{ b: number | undefined }>(ctx => ({ b: ctx.a + 1 }))
      .build()

    isType.equal<true, { a: number, b: number | undefined }, typeof r>()
    expect(r).toEqual({ a: 1, b: 2 })
  })
})
