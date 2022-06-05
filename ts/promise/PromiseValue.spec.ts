import { assertType, PromiseValue } from '../index.js'

test('extract value from Promise', () => {
  const y: PromiseValue<Promise<string>> = ''
  assertType.isString(y)
})
