export type RequiredPick<T, U extends keyof T> = {
  [P in keyof T]: T[P] extends undefined ? never : T[P]
}

export type RequiredExcept<T, U extends keyof T> = {
  [P in keyof T]: P extends U ? T[P] : Exclude<T[P], undefined>
}
