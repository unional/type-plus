import { everyKey } from '..'

test('predicate key can be used as indexer of the subject', () => {
  const subject = { a: 1, b: 2, c: 3 }
  expect(everyKey(subject, key => typeof subject[key] === 'number')).toBe(true)
})
