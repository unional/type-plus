import { requiredDeep } from 'unpartial'
import type { AnyFunction } from '../function/any_function.js'
import type { RecursivePartial } from '../object/RecursivePartial.js'
import type { NoInfer } from '../type/no_infer.js'

export namespace stub {
	export type Param<T> = T extends AnyFunction ? T : RecursivePartial<NoInfer<T>>
}

export function stub<T extends AnyFunction>(stub: T): T
export function stub<T>(stub: RecursivePartial<NoInfer<T>>): T
export function stub<T>(stub: unknown): T {
	return stub as T
}

/**
 * builds a stub function
 */
function build<T>(): (stub?: stub.Param<T>) => T
function build<T>(init: RecursivePartial<T> | (() => RecursivePartial<T>)): (stub?: RecursivePartial<T>) => T
function build<T>(init?: RecursivePartial<T> | (() => RecursivePartial<T>)) {
	return function (value?: stub.Param<T>) {
		const initValue = typeof init === 'function' ? init() : init
		return initValue ? stub(requiredDeep(initValue, value) as any) : stub(value as any)
	}
}

stub.build = build
