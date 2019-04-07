import { PromiseValue } from '.';
import { typeAssert } from './typeAssert';

test('extract value from Promise', () => {
  let y: PromiseValue<Promise<string>> = {} as any
  typeAssert.isString(y)
})
