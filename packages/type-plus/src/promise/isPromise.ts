export function isPromise<R = any>(subject: unknown): subject is Promise<R> {
	// @ts-expect-error
	return !!subject && typeof subject['then'] === 'function'
}
