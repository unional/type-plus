import { RequiredExcept, RequiredPick } from './Required';
import { typeAssert } from './typeAssert';

test('make picked properties required', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number
  }

  let y: RequiredPick<Foo, 'a'> = {} as any

  typeAssert.noUndefined(y.a)
  y.b = undefined
  typeAssert.noUndefined(y.c)
})

test('make not picked properties required', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number
  }

  let y: RequiredExcept<Foo, 'a'> = {} as any

  y.a = undefined
  typeAssert.noUndefined(y.b)
  typeAssert.noUndefined(y.c)
})
