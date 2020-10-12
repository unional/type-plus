import { assertType, brand, TypeEquals } from '..'

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
})

describe('createBrandCreator()', () => {
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
