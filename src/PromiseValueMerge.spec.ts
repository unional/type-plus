import { assertType, PromiseValueMerge } from '.'

test('merge promise value', async () => {
  const result = {} as PromiseValueMerge<Promise<{ a: string }>, Promise<{ b: string }>>
  const value = await result
  assertType<{ a: string, b: string }>(value)
})
