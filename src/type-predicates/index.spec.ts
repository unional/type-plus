import { IsAny, isType, PrimitiveTypes } from '..'

describe('IsAny<T>', () => {
  test('any is true', () => {
    isType.equal<true, true, IsAny<any>>()
  })

  test('string is false', () => {
    isType.equal<true, false, IsAny<string>>()
  })

  test('other singular types are false', () => {
    isType.equal<true, false, IsAny<undefined>>()
    isType.equal<true, false, IsAny<null>>()
    isType.equal<true, false, IsAny<number>>()
    isType.equal<true, false, IsAny<boolean>>()
    isType.equal<true, false, IsAny<string>>()
    isType.equal<true, false, IsAny<symbol>>()
    isType.equal<true, false, IsAny<unknown>>()
    isType.equal<true, false, IsAny<never>>()
    // eslint-disable-next-line @typescript-eslint/ban-types
    isType.equal<true, false, IsAny<{}>>()
    isType.equal<true, false, IsAny<void>>()
  })

  test('union types are false', () => {
    isType.equal<true, false, IsAny<
      undefined | null | number | boolean | string |
      // eslint-disable-next-line @typescript-eslint/ban-types
      symbol | unknown | never | void | object>>()
  })

  test('union of all types is true', () => {
    isType.equal<true, true, IsAny<PrimitiveTypes>>()
  })
})
