export function findKey<T>(subject: T, predicate: (this: void, key: keyof T, index: number, obj: (keyof T)[]) => key is keyof T, thisArg?: any): keyof T | undefined
export function findKey<T>(subject: T, predicate: (key: keyof T, index: number, obj: (keyof T)[]) => boolean, thisArg?: any): keyof TypeError | undefined
export function findKey<T>(subject: T, predicate: any, thisArg?: any) {
  return Object.keys(subject).find(predicate, thisArg)
}
