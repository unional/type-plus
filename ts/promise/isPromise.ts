export function isPromise<R = any>(subject: unknown): subject is Promise<R> {
	// @ts-ignore
	return !!subject && typeof subject['then'] === 'function'
}
