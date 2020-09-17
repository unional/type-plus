// istanbul ignore file
import { Boolean } from './Boolean'

export function If<Cond extends Boolean, T, F>(cond: Cond, t: T, f: F): If<Cond, T, F> {
  return cond.value ? t : f as any
}

export type If<Cond extends Boolean, T, F> = Cond['value'] extends true ? T : F

