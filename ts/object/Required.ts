// Thanks [jack-williams](https://github.com/jack-williams) for the [solution](https://github.com/Microsoft/TypeScript/issues/29269#issuecomment-451602962)

export type RequiredPick<T, U extends keyof T> = Required<Pick<T, U>> & Pick<T, Exclude<keyof T, U>>

export type RequiredExcept<T, U extends keyof T> = Required<Pick<T, Exclude<keyof T, U>>> & Pick<T, U>
