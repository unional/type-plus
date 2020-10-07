import { assertType } from '../assertType'
import { createTypeChecker } from './typeChecker'
import { T } from '..'

describe('check()', () => {
  const checker = createTypeChecker()

  const s: unknown = false
  if (checker.check({ strict: false, debug: false }, T.boolean, s)) {
    assertType<boolean>(s)
  }
})
