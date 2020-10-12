import { assertType, brand, TypeEquals } from '..'
import { brandMatches } from './Brand'

describe('brand()', () => {
  test('without subject', () => {
    const a = brand('a')
    const b = brand('b')

    assertType.isFalse(false as TypeEquals<typeof a, typeof b>)
  })
  test('with subject', () => {
    const a = brand('a', { a: 1 as const })
    const b = brand('b', { b: 'b' })

    assertType.isFalse(false as TypeEquals<typeof a, typeof b>)

    assertType<1>(a.a)
    assertType<string>(b.b)
  })
  test('creates a typed brand creator', () => {
    const createPersonId = brand('person')
    let personId = createPersonId(1)
    let personId2 = createPersonId(2)

    const createBlogPostId = brand('Blog')
    const blogPostId = createBlogPostId(1)

    personId = personId2
    personId2 = personId

    assertType.isFalse(false as TypeEquals<typeof blogPostId, typeof personId>)
  })
})

describe('brandMatches()', () => {
  test('value of same brand matches', () => {
    const a = brand('x', 1)
    const b = brand('x', 2)
    expect(brandMatches(a, b)).toBe(true)

    const c = brand('x', { c: 3 })
    const d = brand('x', { d: 4 })
    expect(brandMatches(c, d)).toBe(true)
  })
  test('work with null and undefined', () => {
    const a = brand('x', undefined)
    const b = brand('x', null)
    expect(brandMatches(a, b)).toBe(true)
  })
  test('different brand will not compile with brandMatches()', () => {
    // const a = brand('x', 1)
    // const b = brand('y', 1)
    // brandMatches(a, b)  // <-- does not compile

    // const c = brand('x', { a: 1 })
    // const d = brand('y', { a: 1 })
    // brandMatches(c, d)  // <-- does not compile
  })
})
