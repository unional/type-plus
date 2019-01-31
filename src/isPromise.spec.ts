import t from 'assert';
import { isPromise } from '.';

test('false if subject is falsy value or non-object', () => {
  t.strictEqual(isPromise(undefined), false)
  t.strictEqual(isPromise(null), false)
  t.strictEqual(isPromise(0), false)
  t.strictEqual(isPromise(true), false)
  t.strictEqual(isPromise('a'), false)
  t.strictEqual(isPromise([]), false)
})

test('false if subject does not have a then function', () => {
  t.strictEqual(isPromise({}), false)
})

test('false if subject.then is not a function', () => {
  t.strictEqual(isPromise({ then: true }), false)
})

test('type guard as promise', () => {
  const subject = { then() { return true } }
  if (isPromise(subject)) {
    t.strictEqual(subject.then(), true)
  }
})
