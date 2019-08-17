import { assertType } from '.';
import { assignability } from '.';

type Options = {
  name: string,
  version: string,
}

const canAssign = assignability<Options>()

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
