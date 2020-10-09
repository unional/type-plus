import t from 'assert'
import { filterKey } from '..'

test(`return type is 'keyof subject'`, () => {
  const subject = { a: 1, b: 2, c: 3 }
  const actual = filterKey(subject, key => subject[key] > 1)
  t.deepStrictEqual(actual, ['b', 'c'])
})
