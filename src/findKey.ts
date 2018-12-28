export function findKey<T>(subject: T, predicate: (this: void, key: keyof T, index: number, obj: string[]) => key is keyof T, thisArg?: any): string | undefined
export function findKey<T>(subject: T, predicate: (key: keyof T, index: number, obj: string[]) => boolean, thisArg?: any): string | undefined
export function findKey<T>(subject: T, predicate: any, thisArg?: any) {
  return Object.keys(subject).find(predicate, thisArg)
}
