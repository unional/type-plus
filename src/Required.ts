// Thanks [jack-williams](https://github.com/jack-williams) for the [solution](https://github.com/Microsoft/TypeScript/issues/29269#issuecomment-451602962)

export type RequiredPick<T, U extends keyof T> = {
  [P in U]-?: Exclude<T[P], undefined>
} & Pick<T, Exclude<keyof T, U>>

export type RequiredExcept<T, U extends keyof T> = {
  [P in Exclude<keyof T, U>]-?: Exclude<T[P], undefined>
} & Pick<T, U>
