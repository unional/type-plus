/**
 * Tests if the subject is assignable to the generic type T.
 */
export function assignability<T>() {
  return <S>(subject: S): typeof subject extends T ? true : false => {
    return !!subject as any
  }
}
