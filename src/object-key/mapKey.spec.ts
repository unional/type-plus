import a from 'assertron'
import { mapKey } from '..'

test('predicate key can be used as indexer of the subject', () => {
  const subject = { a: 1, b: 2, c: 3 }
  const actual = mapKey(subject, key => subject[key] + 1)
  a.satisfies(actual, [2, 3, 4])
})
