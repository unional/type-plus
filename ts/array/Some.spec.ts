import { isType, Some } from '..'

test('empty array', () => {
  isType.equal<true, false, Some<[], any>>()
})

test('typed array', () => {
  isType.equal<true, true, Some<string[], any>>()
  isType.equal<true, true, Some<string[], string>>()
  isType.equal<true, false, Some<string[], number>>()
})

test('contain single returns true', () => {
  isType.equal<true, true, Some<['a', 1], 1>>()
})

test('not contain returns false', () => {
  isType.equal<true, false, Some<['a', 'b', 'c'], 1>>()
})

test('number', () => {
  isType.equal<true, true, Some<['a', number], number>>()
  isType.equal<true, true, Some<['a', 1], 1>>()
  isType.equal<true, true, Some<['a', 777], 777>>()

  isType.equal<true, false, Some<['a', number], 1>>()
  isType.equal<true, true, Some<['a', 12345], number>>()
  isType.equal<true, true, Some<['a', -12345], number>>()
  isType.equal<true, false, Some<['a', 1], 2>>()
})

test('boolean', () => {
  isType.equal<true, true, Some<['a', boolean], boolean>>()
  isType.equal<true, true, Some<['a', true], true>>()
  isType.equal<true, true, Some<['a', false], false>>()

  isType.equal<true, true, Some<['a', false, boolean], boolean>>()
  isType.equal<true, true, Some<['a', boolean, false], boolean>>()
  isType.equal<true, true, Some<['a', boolean, true], true>>()
  isType.equal<true, true, Some<['a', true, boolean], true>>()

  isType.equal<true, true, Some<['a', true], boolean>>()
  isType.equal<true, true, Some<['a', false], boolean>>()
  isType.equal<true, false, Some<['a', boolean], true>>()
  isType.equal<true, false, Some<['a', boolean], false>>()
})

test('string', () => {
  isType.equal<true, true, Some<[1, 2, 3, string], string>>()
  isType.equal<true, true, Some<[1, 2, 3, 'a'], 'a'>>()
  isType.equal<true, true, Some<[1, 2, 3, 'a', 'a'], 'a'>>()

  isType.equal<true, true, Some<[1, 2, 3, 'a'], string>>()
  isType.equal<true, true, Some<[1, 2, 3, 'a'], string>>()
  isType.equal<true, false, Some<[1, 2, 3, string], 'a'>>()
  isType.equal<true, false, Some<[1, 2, 3, 'a'], 'ab'>>()
})

describe('strict mode', () => {
  test('ensure number boolean string does not match literals', () => {
    isType.equal<true, true, Some<[boolean], boolean, 'strict'>>()
    isType.equal<true, true, Some<[number], number, 'strict'>>()
    isType.equal<true, true, Some<[string], string, 'strict'>>()

    isType.equal<true, false, Some<['a', true], boolean, 'strict'>>()
    isType.equal<true, false, Some<['a', 1], number, 'strict'>>()
    isType.equal<true, false, Some<[1, 2, 3, 'a'], string, 'strict'>>()
  })

  test('typed array', () => {
    isType.equal<true, true, Some<boolean[], boolean, 'strict'>>()
    isType.equal<true, true, Some<number[], number, 'strict'>>()
    isType.equal<true, true, Some<string[], string, 'strict'>>()

    isType.equal<true, false, Some<true[], boolean, 'strict'>>()
    isType.equal<true, false, Some<1[], number, 'strict'>>()
    isType.equal<true, false, Some<'a'[], string, 'strict'>>()
  })
})
