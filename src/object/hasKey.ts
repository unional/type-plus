import { AnyRecord } from './AnyRecord'

export type HasKey<T, K, Then = true, Else = false> = K extends keyof T ? Then : Else

export function hasKey<T extends AnyRecord, K extends string>(subject: T, ...keys: K[]): HasKey<T, K> {
  return !keys.some(key => !subject[key]) as unknown as HasKey<T, K>
}
