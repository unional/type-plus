import { as, asAny, isType } from '..'

describe('as<T>()', () => {
  test('defaults subject type to unknown', () => {
    const s: any = {}
    if (as(s)) isType.equal<true, unknown, typeof s>()
  })

  test('cast type to T', () => {
    const s: any = {}
    if (as<number>(s)) isType.equal<true, number, typeof s>()
    if (as<string>(s)) isType.equal<true, string, typeof s>()
    if (as<{ a: number }>(s)) isType.equal<true, { a: number }, typeof s>()
    if (as<any>(s)) isType.equal<true, any, typeof s>()
  })
})

describe('asAny()', () => {
  test('cast type to any', () => {
    const s: unknown = {}
    if (asAny(s)) isType.equal<true, any, typeof s>()
  })
})

