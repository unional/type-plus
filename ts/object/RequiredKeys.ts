import type { KeyTypes } from './KeyTypes.js'
import type { OptionalKeys } from './OptionalKeys.js'

export type RequiredKeys<T extends Record<KeyTypes, any>> = T extends unknown
? RequiredKeys._<T> : never

export namespace RequiredKeys {
export type _<T extends Record<KeyTypes, any>> = Exclude<keyof T, OptionalKeys._<T>>
}
