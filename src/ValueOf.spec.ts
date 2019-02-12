import t from 'assert';
import { ValueOf } from '.';

test('If all values has the same type, the result is of that type', () => {
  const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT'
  }
  const logValue: ValueOf<typeof HTTP_METHOD> = HTTP_METHOD.GET
  t.strictEqual(logValue.substr(0, 1), 'G')
})


test('If value has multiple types, the result is the union of those types', () => {
  const logLevel = {
    none: '0',
    error: '1',
    warn: 2,
    info: 3,
    debug: 4
  }
  const str: ValueOf<typeof logLevel> = logLevel.none
  t.strictEqual(str.length, 1)

  const num: ValueOf<typeof logLevel> = logLevel.warn
  t.strictEqual(num * 1, 2)
})

