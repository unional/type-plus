import { PartialExcept, PartialPick, typeAssert } from '.';

test('make picked properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number
  }

  let y: PartialPick<Foo, 'a'> = {} as any

  y.a = undefined
  typeAssert.noUndefined(y.b)
  typeAssert.noUndefined(y.c)
})

test('make not picked properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number
  }

  let y: PartialExcept<Foo, 'a'> = {} as any

  typeAssert.noUndefined(y.a)
  y.b = undefined
  y.c = undefined
})
