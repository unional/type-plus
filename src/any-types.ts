import { KeyTypes } from './object-key'

export type AnyRecord = Record<KeyTypes, any>

export type AnyFunction = (...args: any[]) => any

export type AnyConstructor = new (...args: any[]) => void
