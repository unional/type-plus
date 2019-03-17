export function mapSeries<R, T = any>(values: T[], fn: (value: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  return values.reduce((p, v) => {
    return p.then(() => fn(v)).then((r: any) => {
      results.push(r)
      return results
    })
  }, Promise.resolve() as any)
}
