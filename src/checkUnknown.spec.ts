import { assertType, checkUnknown } from '.'

test('check unknown type is instance of class', () => {
  const s: unknown = new ReferenceError()
  if (checkUnknown(s, ReferenceError)) {
    assertType<ReferenceError>(s)
  }
})

test('check unknown type satisfy predicate', () => {
  const s: unknown = new ReferenceError()
  if (checkUnknown(s, (s: ReferenceError) => s instanceof ReferenceError)) {
    assertType<ReferenceError>(s)
  }
})
