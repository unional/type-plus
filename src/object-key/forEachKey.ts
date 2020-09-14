export function forEachKey<T>(subject: T, callbackfn: (key: keyof T, index: number, obj: string[]) => void, thisArg?: any) {
  return Object.keys(subject).forEach(callbackfn as any, thisArg)
}
