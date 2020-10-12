import t from 'assert'
import { createId, Id } from '..'

test('createId(type, value) creates Id<T>', () => {
  const foo = createId('foo', 'sample')
  const bar = createId('bar', 'sample')

  // foo = bar; // Error
  t.strictEqual(compatible(foo, bar), false)
})

test('createId(type) creates a function that creates Id<T>', () => {
  const fooc = createId('foo')
  const barc = createId('bar')
  const foo = fooc('sample')
  const bar = barc('sample')

  // foo = bar; // Error
  t.strictEqual(compatible(foo, bar), false)
})

function compatible(x: Id<any>, y: Id<any>) {
  return x.type === y.type
}
