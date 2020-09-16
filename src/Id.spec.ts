import t from 'assert'
import { createId, createIdCreator, Id } from '.'

test('createId<T> creates Id<T>', () => {
  const foo = createId('foo', 'sample')
  const bar = createId('bar', 'sample')

  // foo = bar; // Error
  t.strictEqual(compatible(foo, bar), false)
})

test('createIdCreator<T> creates a function that creates Id<T>', () => {
  const fooc = createIdCreator('foo')
  const barc = createIdCreator('bar')
  const foo = fooc('sample')
  const bar = barc('sample')

  // foo = bar; // Error
  t.strictEqual(compatible(foo, bar), false)
})

function compatible(x: Id<any>, y: Id<any>) {
  return x.type === y.type
}
