import { PartialExcept, PartialPick } from './Partial';
import { excludeUndefined } from './test-util';

test('make picked properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number
  }

  let y: PartialPick<Foo, 'a'> = {} as any

  y.a = undefined
  y.b = excludeUndefined(y.b)
  y.c = excludeUndefined(y.c)
})

test('make not picked properties optional', () => {
  type Foo = {
    a: number,
    b: number,
    c: number
  }

  let y: PartialExcept<Foo, 'a'> = {} as any

  y.a = excludeUndefined(y.a)
  y.b = undefined
  y.c = undefined
})
