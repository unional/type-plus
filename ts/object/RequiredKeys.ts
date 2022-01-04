import { KeyTypes } from './KeyTypes'
import { OptionalKeys } from './OptionalKeys'

export type RequiredKeys<T extends Record<KeyTypes, any>> = T extends unknown
? RequiredKeys._<T> : never

export namespace RequiredKeys {
export type _<T extends Record<KeyTypes, any>> = Exclude<keyof T, OptionalKeys._<T>>
}
