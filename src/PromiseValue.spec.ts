import { PromiseValue } from '.';
import { assertType } from './assertType';

test('extract value from Promise', () => {
  let y: PromiseValue<Promise<string>> = {} as any
  assertType.isString(y)
})
