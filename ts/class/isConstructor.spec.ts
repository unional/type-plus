import { AnyConstructor, assertType, isConstructor } from '../index.js'

test('check constructor', () => {
  const x: unknown = Error
  if (isConstructor(x))
    assertType<AnyConstructor>(x)
})

test('check not constructor', () => {
  expect(isConstructor(() => { })).toBe(false)
})

test('check throw function', () => {
  expect(isConstructor(() => { throw new Error() })).toBe(false)
})

test('check throwing constructor is still true', () => {
  class Foo { constructor() { throw new Error() } }
  expect(isConstructor(Foo)).toBe(true)
})

test('constructor throwing non-error', () => {
  class Foo { constructor() { throw 'abc' } }
  expect(isConstructor(Foo)).toBe(true)
})

test('constructor throwing undefined', () => {
  class Foo { constructor() { throw undefined } }
  expect(isConstructor(Foo)).toBe(true)
})

test('class with params returns true', () => {
  class Boo { constructor(public a: number) { } }
  expect(isConstructor(Boo)).toBe(true)
})
