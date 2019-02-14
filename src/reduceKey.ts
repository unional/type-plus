export function reduceKey<T, S>(subject: S, callbackfn: (previousValue: T, key: keyof S, currentIndex: number, array: string[]) => T, initialValue: T): T {
  return Object.keys(subject).reduce(callbackfn as any, initialValue)
}
