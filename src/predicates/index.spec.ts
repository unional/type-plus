import { IsAny, IsBoolean, IsLiteral, isType, PrimitiveTypes } from '..'

describe('IsLiteral<T>', () => {
  test('`number` is not literal', () => {
    isType.equal<true, false, IsLiteral<number>>()
  })

  test('numeric literals are literals', () => {
    isType.equal<true, true, IsLiteral<1>>()
    isType.equal<true, true, IsLiteral<12345>>()
  })

  test('`string` is not literal', () => {
    isType.equal<true, false, IsLiteral<string>>()
  })

  test('string literals are literals', () => {
    isType.equal<true, true, IsLiteral<'1'>>()
    isType.equal<true, true, IsLiteral<'abc'>>()
  })

  test('override Then/Else', () => {
    isType.equal<true, 'yes', IsLiteral<'1', 'yes'>>()
    isType.equal<true, 'no', IsLiteral<string, 'yes', 'no'>>()
  })
})

describe('IsBoolean<T>', () => {
  test('boolean/true/false', () => {
    isType.equal<true, true, IsBoolean<boolean>>()
    isType.equal<true, false, IsBoolean<false>>()
    isType.equal<true, false, IsBoolean<true>>()
  })
  test('override Then/Else', () => {
    isType.equal<true, 'yes', IsBoolean<boolean, 'yes'>>()
    isType.equal<true, 'no', IsBoolean<1, 'yes', 'no'>>()
  })
})

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
