/**
 * Tests if the subject is assignable to the generic type T.
 */
export function assignability<T>(handler?: (s: any) => boolean) {
  return <S>(subject: S): S extends T ? true : false => {
    if (handler) return handler(subject) as any
    return !!subject as any
  }
}
