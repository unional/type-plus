import { assertType } from '..'
import * as T from '../types'
import { createTypeChecker } from './typeChecker'

describe('check()', () => {
  test('bool', () => {
    const checker = createTypeChecker()

    const s: unknown = false
    if (checker.check({ strict: false, debug: false }, T.boolean.true, s)) {
      assertType<true>(s)
    }
  })
})
