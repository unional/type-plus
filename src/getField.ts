import { UnionKeys } from './UnionKeys'

export function getField<
  T,
  TX extends Exclude<T, undefined | null>,
  K extends UnionKeys<TX>,
  >(subject: T, key: K): TX[K]
export function getField<
  T,
  TX extends Exclude<T, undefined | null>,
  K extends UnionKeys<TX>,
  DV extends Exclude<TX[K], undefined>
>(subject: T, key: K, defaultValue: DV): DV
export function getField<
  T,
  TX extends Exclude<T, undefined | null>,
  K extends UnionKeys<TX>,
  DV extends Exclude<TX[K], undefined>
>(subject: T, key: K, defaultValue?: DV): DV {
  return subject && (subject as any)[key] || defaultValue
}
