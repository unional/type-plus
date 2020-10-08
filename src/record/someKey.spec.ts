import { someKey } from '..'

test('predicate key can be used as indexer of the subject', () => {
  const subject = { a: 1, b: 2, c: 3 }
  expect(someKey(subject, key => subject[key] === 2)).toBe(true)
})
