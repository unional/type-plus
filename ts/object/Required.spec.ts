import { assertType, RequiredExcept, RequiredPick } from '../index.js'

test('make picked properties required', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number,
  }

  const y: RequiredPick<Foo, 'a'> = { a: 1, c: 2 }

  assertType.noUndefined(y.a)
  y.b = undefined
  assertType.noUndefined(y.c)
})

test('make not picked properties required', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number,
  }

  const y: RequiredExcept<Foo, 'a'> = { b: 1, c: 2 }

  y.a = undefined
  assertType.noUndefined(y.b)
  assertType.noUndefined(y.c)
})
