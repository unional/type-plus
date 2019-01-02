import { RecursiveIntersect } from './RecursiveIntersect';

test('add undefined to types', () => {
  acceptUndefined('a' as RecursiveIntersect<string, undefined>)
  acceptUndefined(1 as RecursiveIntersect<number, undefined>)
  acceptUndefined(true as RecursiveIntersect<boolean, undefined>)
  acceptUndefined(1n as RecursiveIntersect<bigint, undefined>)
  acceptUndefined(undefined as RecursiveIntersect<undefined, undefined>)
  acceptUndefined(null as RecursiveIntersect<null, undefined>)

  const obj = { x: 1 } as RecursiveIntersect<{ x: number }, undefined>
  acceptUndefined(obj)
  acceptUndefined(obj.x)

  const arr = ['1'] as RecursiveIntersect<string[], undefined>
  acceptUndefined(arr)
  const y = arr[0]
  acceptUndefined(y)

  function acceptUndefined(x: undefined) {
    return x
  }
})

test('add object type to types', () => {
  type U = { u: number };

  acceptU(addU('a'))
  acceptU(addU(1))
  acceptU(addU(true))
  acceptU(addU(1n))
  acceptU(addU(undefined))
  acceptU(addU(null))

  const obj = addU({ x: 1 })
  acceptU(obj)
  acceptU(obj.x)

  const arr = addU(['1'])
  acceptU(arr)
  const y = arr[0]
  acceptU(y)

  function addU<T>(x: T): RecursiveIntersect<typeof x, U> {
    return x as any
  }

  function acceptU(x: U) {
    return x
  }
})
