import { assertType, brand, TypeEquals } from '..'

describe('brand()', () => {
  test('basic use case', () => {
    const a = brand('a', { a: 1 as const })
    const b = brand('b', { b: 'b' })

    assertType.isFalse(false as TypeEquals<typeof a, typeof b>)
    assertType<1>(a.a)
    assertType<string>(b.b)
  })
  test('without subject creates a typed brand creator', () => {
    const createPerson = brand('person')
    let person1 = createPerson(1)
    let person2 = createPerson(2)

    const createBlogPost = brand('Blog')
    const blogPost = createBlogPost(1)

    person1 = person2
    person2 = person1

    assertType.isFalse(false as TypeEquals<typeof blogPost, typeof person1>)
  })
})
