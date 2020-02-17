import { PromiseValueMerge, typeAssert } from '.'

test('merge promise value', async () => {
  const result = {} as PromiseValueMerge<Promise<{ a: string }>, Promise<{ b: string }>>
  const value = await result
  typeAssert<{ a: string, b: string }>(value)
})
