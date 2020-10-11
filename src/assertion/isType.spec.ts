import { assertType, isType } from '..'

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
      const s: string | number = 1 as any
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
    // this is currently not working
    // https://github.com/microsoft/TypeScript/issues/41050
    test.skip('Class as validator fails', () => {
      class Foo { }
      const s: Foo | number = 1 as any
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
