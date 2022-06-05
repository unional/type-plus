import { assertType, Equal, isType } from '../index.js'

describe('isType()', () => {
  describe('without validator', () => {
    test('subject type is checked at compile time', () => {
      const subject = { a: 1, b: 2 } as const
      if (isType<{ a: 1 }>(subject)) {
        assertType<{ a: 1 }>(subject)
      }
    })
    test('work with falsy value such as empty string', () => {
      const s = ''
      if (isType<''>(s)) {
        assertType<''>(s)
      }
    })
  })
  describe('with validator function', () => {
    test('Specify T in the validate function', () => {
      const s: unknown = false
      if (isType(s, (s: boolean) => typeof s === 'boolean'))
        assertType<boolean>(s)
    })
    test('Specify T at type declaration', () => {
      const s: unknown = false
      if (isType<boolean>(s, s => typeof s === 'boolean'))
        assertType<boolean>(s)
    })
    test('exclude type if type guard fails', () => {
      const s: string | number = 1
      if (isType<string>(s, s => typeof s === 'string')) {
        assertType<string>(s)
      }
      else {
        assertType<number>(s)
      }
    })
  })
  describe('with class', () => {
    test('Class as validator', () => {
      const s: unknown = new Error()
      if (isType(s, Error))
        assertType<Error>(s)
    })
    test('Class as validator fails', () => {
      class Foo { a() { } }
      const s: Foo | number = 1
      if (isType(s, Foo)) {
        assertType<Foo>(s)
      }
      else {
        assertType<number>(s)
      }
    })
    test('subject can be type any', () => {
      const s: any = false
      if (isType<boolean>(s, s => typeof s === 'boolean'))
        assertType<boolean>(s)
    })
  })
})

describe('isType.t()', () => {
  test('accept true type but not false or boolean', () => {
    expect(isType.t<true>()).toBe(true)
    expect(isType.t<Equal<1, 1>>()).toBe(true)

    // these fails
    // isType.t<false>()
    // isType.t<boolean>()
  })
  test('accept value with type true but not false or boolean', () => {
    expect(isType.t(true)).toBe(true)

    // these fails
    // isType.t(false)
    // isType.t(1 === 1)
  })
})

describe('isType.f()', () => {
  test('accept false type but not true or boolean', () => {
    expect(isType.f<false>()).toBe(true)
    expect(isType.f<Equal<1, 2>>()).toBe(true)

    // these fails
    // isType.f<true>()
    // isType.f<boolean>()
  })
  test('accept value with type true but not false or boolean', () => {
    expect(isType.f(false)).toBe(true)

    // these fails
    // isType.f(true)
    // isType.f(1 !== 1)
  })
})

describe('isType.equal()', () => {
  test('true case', () => {
    isType.equal<true, 1, 1>()
  })
  test('false case', () => {
    isType.equal<false, '1', 1>()
  })
})
