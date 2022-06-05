import { AnyRecord } from './AnyRecord.js'

export type ReplaceProperty<
  T extends AnyRecord,
  K extends keyof T,
  V
  > = Omit<T, K> & { [P in K]: V }

export function replaceProperty<T extends AnyRecord,
  K extends keyof T, V>(subject: T, key: K, value: V): ReplaceProperty<T, K, V> {
  return { ...subject, [key]: value }
}
