import { assertType, PromiseValue } from '.'

test('extract value from Promise', () => {
  const y: PromiseValue<Promise<string>> = '' as any
  assertType.isString(y)
})
