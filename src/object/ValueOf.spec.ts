import { isType, ValueOf } from '..'

test('work with primitive type', () => {
  type A = ValueOf<string>
  isType.equal<false, never, A>()
})

test('If all values has the same type, the result is of that type', () => {
  const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
  }
  type A = ValueOf<typeof HTTP_METHOD>
  isType.equal<true, string, A>()
})

test('If value has multiple types, the result is the union of those types', () => {
  const logLevel = {
    none: '0',
    error: '1',
    warn: 2,
    info: 3,
    debug: 4,
  }
  type A = ValueOf<typeof logLevel>
  isType.equal<true, string | number, A>()
})

