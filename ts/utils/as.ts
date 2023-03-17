export function as<T>(subject: unknown): T {
	return subject as T
}

export function asAny(subject: unknown): any {
	return subject
}

/**
 * amend `subject` with type `T`
 */
export function amend<S>(subject: S) {
	return {
		union<T>(): T & S {
			return subject as T & S
		},
		intersect<T>(): T | S {
			return subject as T | S
		}
	}
}
