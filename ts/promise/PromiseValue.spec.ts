import { assertType, PromiseValue } from '..'

test('extract value from Promise', () => {
  const y: PromiseValue<Promise<string>> = ''
  assertType.isString(y)
})
