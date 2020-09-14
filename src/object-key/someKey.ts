export function someKey<T>(subject: T, predicate: (key: keyof T, index: number, array: string[]) => unknown, thisArg?: any) {
  return Object.keys(subject).some(predicate as any, thisArg)
}
