import { requiredDeep } from 'unpartial'
import type { AnyFunction } from '../function/any_function.js'
import type { RecursivePartial } from '../object/RecursivePartial.js'

export namespace stub {
	export type Param<T> = T extends AnyFunction ? T : RecursivePartial<T>
}

export function stub<T>(stub?: stub.Param<T>) {
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
		return initValue ? stub<T>(requiredDeep(initValue, value) as any) : stub<T>(value)
	}
}

stub.build = build
