export type PartialPick<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>> & Partial<Pick<T, U>>

export type PartialExcept<T, U extends keyof T> = Pick<T, U> & Partial<Pick<T, Exclude<keyof T, U>>>
