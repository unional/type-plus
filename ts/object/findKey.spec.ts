import t from 'assert'
import { findKey } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
  const subject = { a: 1, b: 2, c: 3 }
  const actual = findKey(subject, key => subject[key] === 2)
  t.strictEqual(actual, 'b')
})
