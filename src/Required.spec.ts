import { RequiredExcept, RequiredPick } from './Required';
import { excludeUndefined, acceptNoUndefined } from './test-util';

test('make picked properties optional', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number
  }

  let y: RequiredPick<Foo, 'a'> = {} as any

  acceptNoUndefined(y.a)
  y.b = undefined
  y.c = excludeUndefined(y.c)
})

test('make not picked properties optional', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number
  }

  let y: RequiredExcept<Foo, 'a'> = {} as any

  y.a = undefined
  acceptNoUndefined(y.b)
  y.c = excludeUndefined(y.c)
})
