import t from 'assert';
import { forEachKey } from '..';

test('predicate key can be used as indexer of the subject', () => {
  const subject = { a: 1, b: 2, c: 3 }
  let actual = 0
  forEachKey(subject, key => actual += subject[key])
  t.strictEqual(actual, 6)
})
