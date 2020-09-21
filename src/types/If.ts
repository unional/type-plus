// istanbul ignore file
import { Boolean } from './Boolean'
import { valueSym } from '../utils'

export function If<Cond extends Boolean, T, F>(cond: Cond, t: T, f: F): If<Cond, T, F> {
  return cond[valueSym] ? t : f as any
}

export type If<Cond extends Boolean, T, F> = Cond[typeof valueSym] extends true ? T : F
