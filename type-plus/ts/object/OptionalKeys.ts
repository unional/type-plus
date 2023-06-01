import type { KeyTypes } from './KeyTypes.js'

export type OptionalKeys<O extends Record<KeyTypes, any>> = O extends unknown ? OptionalKeys._<O> : never

export namespace OptionalKeys {
	export type _<O extends Record<KeyTypes, any>> = {
		[K in keyof O]-?: Record<KeyTypes, any> extends Pick<O, K> ? K : never
	}[keyof O]
}
