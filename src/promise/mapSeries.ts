export function mapSeries<R, T = any>(values: T[], fn: (value: T) => Promise<R>): Promise<R[]> {
  return values.reduce(
    (p, v) => p.then(r => fn(v).then(v => (r.push(v), r))),
    Promise.resolve<R[]>([]))
}
