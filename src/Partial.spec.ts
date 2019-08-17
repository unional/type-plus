import { PartialExcept, PartialPick, assertType, PartialOmit } from '.';

test('make picked properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number,
  }

  const y: PartialPick<Foo, 'a'> = {} as any

  y.a = undefined
  assertType.noUndefined(y.b)
  assertType.noUndefined(y.c)
})

test('make not specified properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number,
  }

  // tslint:disable-next-line: deprecation
  const y: PartialExcept<Foo, 'a'> = {} as any

  assertType.noUndefined(y.a)
  y.b = undefined
  y.c = undefined
})


test('make not specified properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number,
  }

  const y: PartialOmit<Foo, 'a'> = {} as any

  assertType.noUndefined(y.a)
  y.b = undefined
  y.c = undefined
})
