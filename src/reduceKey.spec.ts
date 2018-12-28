import t from 'assert';
import { reduceKey } from '.';

test('predicate key can be used as indexer of the subject', () => {
  const subject = { a: 1, b: 2, c: 3 }
  const actual = reduceKey(subject, (p, k) => p += subject[k], 'a')
  t.strictEqual(actual, 'a123')
})
