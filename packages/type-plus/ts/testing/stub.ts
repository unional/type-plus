import { requiredDeep } from 'unpartial'

import type { AnyFunction } from '../function/any_function.js'
import type { RecursivePartial } from '../object/recursive_partial.js'
import type { NoInfer } from '../type/no_infer.js'

/**
 * stub a value.
 *
 * If the value is a function, it will be passed through as-is.
 *
 * 🦴 `utilities`
 */
export function stub<T extends AnyFunction>(stub: T): T
export function stub<T>(stub: RecursivePartial<NoInfer<T>>): T
export function stub<T>(stub: unknown): T {
	return stub as T
}

/**
 * builds a stub function
 */
function build<T>(
	init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)
): (stub?: RecursivePartial<T>) => T
function build<T>(init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)) {
	return builder(init).create()
}

/**
 * Create a builder for a stub function of type T.
 *
 * The builder contains two methods:
 *
 * `.with()`: adds additional handler or partial stub.
 * `.create()`: creates the final stub function.
 *
 * @example
 * ```ts
 * const b = stub.builder<{ a: number; b: string }>({ a: 1 }).with({ b: 'b' }).create()
 * b({ a: 2 }) // { a: 2, b: 'b' }
 * ```
 */
function builder<T>(init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)) {
	return builderInternal([init])
}

function builderInternal<T>(
	initializers: Array<RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)>
) {
	const builder = {
		/**
		 * Adds an init object or handler to the builder.
		 *
		 * If `init` is an object, it will be merged with the stub object.
		 * If `init` is a function, it will be called with the stub object.
		 *
		 * @return {Builder<T>} The builder instance.
		 */
		with(init: RecursivePartial<T> | ((stub?: RecursivePartial<T>) => RecursivePartial<T>)) {
			return builderInternal([...initializers, init])
		},
		/**
		 * Creates the resulting stub function.
		 */

		create() {
			return (stub?: RecursivePartial<T>) => {
				return initializers.reduce((acc, init) => {
					if (typeof init === 'function') {
						return init(acc)
					}
					return requiredDeep<RecursivePartial<T>>(init, acc)
				}, stub) as T
			}
		}
	}
	return builder
}
stub.build = build
stub.builder = builder
