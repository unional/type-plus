import { assertType, PromiseValueMerge, ReplaceProperty } from '.'

test('replace', async () => {
  type T1 = {
    getConfig(): Promise<{ a: string }>,
    T1: string
  }
  type T2 = {
    getConfig(): Promise<{ b: string }>,
    T2: string
  }

  const replaced = { getConfig: () => Promise.resolve({}) } as ReplaceProperty<T1 & T2, 'getConfig', () => PromiseValueMerge<ReturnType<T1['getConfig']>, ReturnType<T2['getConfig']>>>

  const result = replaced.getConfig()
  const value = await result
  assertType<{ a: string, b: string }>(value)
})
