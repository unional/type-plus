
/**
 * @deprecated replaced by `Omit`
 */
export type Except<T, K extends keyof T> = Omit<T, K>

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
