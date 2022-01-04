import { assertType, isSystemError } from '..'

describe('isSystemError()', () => {
  test('ENOENT', () => {
    const s: unknown = {}
    if (isSystemError('ENOENT', s)) {
      assertType<'ENOENT'>(s.code)
      assertType<string>(s.path)
    }
  })
})
