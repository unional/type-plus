import { isType, PromiseOrValue } from '../index.js'

describe(`${PromiseOrValue.transform.name}()`, () => {
  it('returns the result from the handler directly if it is not a promise', () => {
    const r = PromiseOrValue.transform(1, v => String(v))

    isType.equal<true, string, typeof r>()
    expect(r).toEqual('1')
  })

  it('returns a promise that resolves to the result from the handler', async () => {
    const r = PromiseOrValue.transform(Promise.resolve(1), v => String(v))

    isType.equal<true, Promise<string>, typeof r>()
    expect(r).not.toEqual('1')
    expect(await r).toEqual('1')
  })

  it('preserves the type of it is PromiseOrValue', () => {
    const v: PromiseOrValue<number> = 1 as PromiseOrValue<number>
    const r = PromiseOrValue.transform(v, v => String(v))
    isType.equal<true, string | Promise<string>, typeof r>()
    expect(r).toEqual('1')
  })
})
