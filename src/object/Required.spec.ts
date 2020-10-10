import { assertType, RequiredExcept, RequiredPick } from '..'

test('make picked properties required', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number,
  }

  const y: RequiredPick<Foo, 'a'> = { a: 1, c: 2 } as any

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

  const y: RequiredExcept<Foo, 'a'> = { b: 1, c: 2 } as any

  y.a = undefined
  assertType.noUndefined(y.b)
  assertType.noUndefined(y.c)
})
