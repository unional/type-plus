import { Omit } from './Omit'

/**
 * @deprecated replaced by `Omit`
 */
export type Except<T, K extends keyof T> = Omit<T, K>
