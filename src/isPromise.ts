export function isPromise<R = any>(subject: any): subject is Promise<R> {
  return !!subject && typeof subject.then === 'function'
}
