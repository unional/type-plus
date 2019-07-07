import { tryAssign, assertType } from '.';

describe('tryAssign()', () => {
  test('assignable will return the assigned type', () => {
    const num: number | undefined = 1 as any

    assertType.isUndefined(tryAssign(undefined, num))

    const x: boolean | string = true as any

    assertType.isString(tryAssign('a', x))
  })

  test('not assigned will return never type', () => {
    const num: number = 1

    assertType.isNever(tryAssign(undefined, num))
  })
})
