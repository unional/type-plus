import { Boolean } from './Boolean'

export function If<Cond extends Boolean, T, F>(cond: Cond, t: T, f: F): Condition<T, F>[Cond['value'] extends true ? 'true' : 'false'] {
  return cond.value ? t : f as any
}

// export namespace If {
// }

export type Condition<T, F> = { 'true': T, 'false': F }

export type If<Cond extends Boolean, T, F> = Condition<T, F>[Cond['value'] extends true ? 'true' : 'false']

