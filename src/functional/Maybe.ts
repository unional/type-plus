import { Brand } from '../nominal-types'
import { Widen } from '../utils'

export type Just<T> = Brand<'maybe', T> & { unwrap(): T }
export function Just<T>(value: T): Maybe<Widen<T>> {
  if (value === undefined) return None()
  return { unwrap() { return value } } as Maybe<Widen<T>>
}

export type None<T> = Brand<'maybe', void> & { unwrap(): T }
export function None<T>(): Maybe<Widen<T>> {
  return { unwrap() { } } as Maybe<Widen<T>>
}

export type Maybe<T> = Just<T> | None<T>
