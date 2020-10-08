import { assertType, T } from '..'
import { createTypeChecker } from './typeChecker'

describe('check()', () => {
  test('bool', () => {
    const checker = createTypeChecker()

    const s: unknown = false
    if (checker.check({ strict: false, debug: false }, T.boolean, s)) {
      assertType<boolean>(s)
    }
  })
})
