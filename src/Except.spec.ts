import { Except, assertType } from '.'

test('Remove properties', () => {
  type Foo = {
    a: number,
    b: string,
    c: boolean,
  }

  // tslint:disable-next-line: deprecation
  type Actual = Except<Foo, 'c'>
  const a: Actual = { a: 0, b: '' } as any
  assertType.isNumber(a.a)
  assertType.isString(a.b)

  // tslint:disable-next-line: deprecation
  type Revert = Except<Foo, keyof Actual>
  const r: Revert = { c: false } as any
  assertType.isBoolean(r.c)
})
