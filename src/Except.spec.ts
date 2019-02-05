import { Except, typeAssert } from '.';

test('Remove properties', () => {
  type Foo = {
    a: number,
    b: string,
    c: boolean
  }

  type Actual = Except<Foo, 'c'>
  let a: Actual = {} as any
  typeAssert.isNumber(a.a)
  typeAssert.isString(a.b)

  type Revert = Except<Foo, keyof Actual>
  let r: Revert = {} as any
  typeAssert.isBoolean(r.c)
})
