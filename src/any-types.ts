export type AnyRecord = Record<keyof any, any>

export type AnyFunction = (...args: any[]) => any

export type AnyConstructor = new (...args: any[]) => void
