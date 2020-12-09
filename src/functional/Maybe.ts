import { Equal } from '../assertion'
import { If } from '../conditional'
import { Brand } from '../nominal-types'
import { Widen } from '../utils'

export type Maybe<T> = Just<T> | None<T>
export type Just<T> = Brand<'maybe', T> & { unwrap(): T }
export type None<T> = Brand<'maybe', void> & { unwrap(): T }

export function just<T>(value: T): If<
  Equal<T, undefined | null>,
  None<T>,
  Just<Widen<NonNullable<T>>>> {
  return { unwrap() { return value } } as any
}

export function none<T>(): None<T> {
  return { unwrap() { } } as None<T>
}
