import type { AnyConstructor } from './AnyConstructor.js'

/**
 * Is the subject a constructor function.
 *
 * @deprecated this is not a failsafe test,
 * it will return true for any function that can be called with `new`.
 *
 * If the subject is an arrow function,
 * it can still return true after compilation.
 *
 * Thus this function is not safe to use.
 */
export function isConstructor(subject: unknown): subject is AnyConstructor {
	try {
		new (subject as AnyConstructor)()
	} catch (err: any) {
		const msg = err?.message as string | undefined
		if (msg && msg.indexOf('is not a constructor') >= 0) {
			return false
		}
	}
	return true
}

/**
 * instanceof type guard for unknown value.
 */
export function isInstanceof<T extends AnyConstructor>(
	subject: unknown,
	constructor: T
): subject is InstanceType<T> {
	return subject instanceof constructor
}
