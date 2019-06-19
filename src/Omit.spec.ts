import { Omit, typeAssert } from '.';

test('Remove properties', () => {
  type Foo = {
    a: number,
    b: string,
    c: boolean
  }

  // tslint:disable-next-line: deprecation
  type Actual = Omit<Foo, 'c'>
  let a: Actual = {} as any
  typeAssert.isNumber(a.a)
  typeAssert.isString(a.b)

  // tslint:disable-next-line: deprecation
  type Revert = Omit<Foo, keyof Actual>
  let r: Revert = {} as any
  typeAssert.isBoolean(r.c)
})

test('distributive omit', () => {
  type Action = InvokeAction | ReturnAction

  type InvokeAction = {
    type: 'invoke',
    id: string,
    payload: string[]
  }

  type ReturnAction = {
    type: 'return',
    id: string,
    payload: string
  }

  let x: Omit<Action, 'id'> = {} as any

  let actions: Action[] = []

  actions.push({ ...x, id: '1' })
})

test('distributive Omit with disjoined keys', () => {
  type Union = {
    type: 'A',
    foo: string
  } | {
    type: 'B',
    foo: string
    bar: string
  }
  type Id<T> = {} & { [P in keyof T]: T[P] }
  let x: Id<Omit<Union, 'bar'>> = { type: 'A', foo: 'foo' }
  x = { type: 'B', foo: 'bar' }
  expect(x.foo).toBe('bar')
})

test('intersection types with generic', () => {
  type Foo = { a: string, b: string }
  function foo<T>(input: Omit<Foo & T, 'a'>): void {
    typeAssert.isString(input.b)
  }
  foo({ b: '1' })
})
