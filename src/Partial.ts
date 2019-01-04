export type PartialPick<T, U extends keyof T> = {
  [P in keyof T]: P extends U ? T[P] | undefined : T[P]
}

export type PartialExcept<T, U extends keyof T> = {
  [P in keyof T]: P extends U ? T[P] : T[P] | undefined
}
