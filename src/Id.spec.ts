import t from 'assert';
import { createId, createIdCreator, Id } from './Id';
test('createId<T> creates Id<T>', () => {
  let foo = createId('foo', 'sample')
  let bar = createId('bar', 'sample')

  // foo = bar; // Error
  t.strictEqual(compatible(foo, bar), false)
})

test('createIdCreator<T> creates function that creates ID<T>', () => {
  const fooc = createIdCreator('foo')
  const barc = createIdCreator('bar')
  let foo = fooc('sample')
  let bar = barc('sample')

  // foo = bar; // Error
  t.strictEqual(compatible(foo, bar), false)
})

function compatible(x: Id<any>, y: Id<any>) {
  return x.type === y.type
}
