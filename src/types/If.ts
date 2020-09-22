// istanbul ignore file
import { valueSym } from '../utils'
import { Boolean } from './Boolean'

export function If<Cond extends Boolean, T, F>(cond: Cond, t: T, f: F): If<Cond, T, F> {
  return cond[valueSym] ? t : f as any
}

export type If<Cond extends Boolean, T, F> = Cond[typeof valueSym] extends true ? T : F
