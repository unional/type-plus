import { tryAssign, typeAssert } from '.';

describe('tryAssign()', () => {
  test('assignable will return the assigned type', () => {
    const num: number | undefined = 1 as any

    typeAssert.isUndefined(tryAssign(undefined, num))

    const x: boolean | string = true as any

    typeAssert.isString(tryAssign('a', x))
  })

  test('not assigned will return never type', () => {
    const num: number = 1

    typeAssert.isNever(tryAssign(undefined, num))
  })
})
