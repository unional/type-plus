import { assertType, createBrandCreator, tryAssign } from '..'
import { brand } from './Brand'

describe('brand()', () => {
  test('without subject', () => {
    const a = brand('a')
    const b = brand('b')

    assertType<never>(tryAssign(a, b))
    assertType<never>(tryAssign(b, a))
  })
  test('with subject', () => {
    const a = brand('a', { a: 1 as const })
    const b = brand('b', { b: 'b' })

    assertType<never>(tryAssign(a, b))
    assertType<never>(tryAssign(b, a))

    assertType<1>(a.a)
    assertType<string>(b.b)
  })
})

describe('createBrandCreator()', () => {
  test('creates a typed brand creator', () => {
    const createPersonId = createBrandCreator<'Person', number>()
    let personId = createPersonId(1)
    let personId2 = createPersonId(2)

    const createBlogPostId = createBrandCreator<'Blog', number>()
    const blogPostId = createBlogPostId(1)

    personId = personId2
    personId2 = personId

    assertType<never>(tryAssign(blogPostId, personId))
    assertType<never>(tryAssign(personId, blogPostId))
  })
})
