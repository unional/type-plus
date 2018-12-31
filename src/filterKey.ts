export function filterKey<T>(subject: T, callbackfn: (this: void, key: keyof T, index: number, obj: (keyof T)[]) => key is keyof T, thisArg?: any): (keyof T)[]
export function filterKey<T>(subject: T, callbackfn: (key: keyof T, index: number, obj: (keyof T)[]) => boolean, thisArg?: any): (keyof T)[]
export function filterKey<T>(subject: T, callbackfn: any, thisArg?: any) {
  return Object.keys(subject).filter(callbackfn, thisArg)
}
