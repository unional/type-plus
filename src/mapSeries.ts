export async function mapSeries<R, T = any>(values: T[], fn: (value: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < values.length; i++) {
    results.push(await fn(values[i]))
  }
  return results
}
