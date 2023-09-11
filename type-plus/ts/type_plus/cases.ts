const $then = Symbol('then')
export type $Then = typeof $then

const $else = Symbol('else')
export type $Else = typeof $else

const $never = Symbol('never')
export type $Never = typeof $never

const $error = Symbol('error')
export interface $Error<M extends string> {
	type: typeof $error,
	message: M
}
