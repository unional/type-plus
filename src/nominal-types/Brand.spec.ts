import { assertType, brand, CanAssign, Equal, flavor } from '..'

describe('brand()', () => {
  test('unbranded type cannot assign to branded type', () => {
    const a = brand('a', { a: 1 })
    const b = { a: 1 }
    assertType.isFalse(false as CanAssign<typeof b, typeof a>)
  })
  test('basic use case', () => {
    const a = brand('a', { a: 1 as const })
    const b = brand('b', { b: 'b' })

    assertType.isFalse(false as CanAssign<typeof a, typeof b>)
    assertType<1>(a.a)
    assertType<string>(b.b)
  })
  test('same brand of the same type can be assigned to each other', () => {
    const a = brand('a', { a: 1 })
    let b = brand('a', { a: 2 })

    b = a
    expect(b.a).toBe(1)
  })
  test('flavor with the same name cannot be assigned to brand', () => {
    const b = brand('x', { a: 1 })
    const f = flavor('x', { a: 1 })
    assertType.isFalse(false as CanAssign<typeof f, typeof b>)
  })
  test('without subject creates a typed brand creator', () => {
    const createPerson = brand('person')
    let person1 = createPerson(1)
    let person2 = createPerson(2)

    const createBlogPost = brand('Blog')
    const blogPost = createBlogPost(1)

    person1 = person2
    person2 = person1

    assertType.isFalse(false as Equal<typeof blogPost, typeof person1>)
  })
})
