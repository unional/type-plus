import { as, asAny, isType } from '..'

describe('as<T>()', () => {
  test('defaults subject type to unknown', () => {
    const s: any = {}
    const a = as(s)
    isType.equal<true, unknown, typeof a>()
  })

  test('cast type to T', () => {
    const s: any = {}
    const n = as<number>(s)
    isType.equal<true, number, typeof n>()

    const str = as<string>(s)
    isType.equal<true, string, typeof str>()

    const o = as<{ a: number }>(s)
    isType.equal<true, { a: number }, typeof o>()

    const any = as<any>(s)
    isType.equal<true, any, typeof any>()
  })
})

describe('asAny()', () => {
  test('cast type to any', () => {
    const s: unknown = {}
    const a = asAny(s)
    isType.equal<true, any, typeof a>()
  })
})

