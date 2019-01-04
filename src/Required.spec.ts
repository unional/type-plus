import { RequiredExcept, RequiredPick } from './Required';
import { excludeUndefined } from './test-util';

test('make picked properties optional', () => {
  type Foo = {
    a?: number,
    b?: number,
    c: number
  }

  let y: RequiredPick<Foo, 'a'> = {} as any

  // https://github.com/Microsoft/TypeScript/issues/29269
  // acceptNoUndefined(y.a)
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
  // https://github.com/Microsoft/TypeScript/issues/29269
  // acceptNoUndefined(y.b)
  y.c = excludeUndefined(y.c)
})
