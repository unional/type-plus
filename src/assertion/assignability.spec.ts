import { assertType, assignability } from '..'

type Options = {
  name: string,
  version: string,
}

const canAssign = assignability<Options>(s => typeof s?.name === 'string' && typeof s?.version === 'string')

test('not matched type is not assignable', () => {
  assertType.isFalse(canAssign({
    name: 'name',
    version: 123,
  }))
})

test('exact match type is assignable', () => {
  assertType.isTrue(canAssign({
    name: 'name',
    version: '1.0.0',
  }))
})

test('with extra property is assignable', () => {
  assertType.isTrue(canAssign({
    name: 'name',
    version: '1.0.0',
    hello: 'world',
  }))
})

test('without handler', () => {
  assertType.isTrue(assignability<{ a: number }>()({ a: 1 }))
})
