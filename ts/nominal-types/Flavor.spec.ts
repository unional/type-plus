import { assertType, brand, CanAssign, Flavor, flavor, isType } from '..'

test('underlying type can be assigned to Flavor', () => {
  type PersonId = Flavor<'Person', number>
  type BlogId = Flavor<'Blog', number>

  let personId: PersonId = 1
  let personId2: PersonId = 2

  personId = personId2
  personId2 = personId

  const blogId: BlogId = 1

  isType.f<CanAssign<typeof blogId, typeof personId>>()
})

describe('flavor()', () => {
  test('basic use case', () => {
    const a = flavor('a', { a: 1 as const })
    const b = flavor('b', { b: 'b' })

    isType.f<CanAssign<typeof a, typeof b>>()
    assertType<1>(a.a)
    assertType<string>(b.b)
  })
  test('same flavor of the same type can be assigned to each other', () => {
    const a = flavor('a', { a: 1 })
    let b = flavor('a', { a: 2 })
    b = a
    expect(b.a).toBe(1)
  })
  test('brand with the same name can be assigned to flavor', () => {
    const b = brand('x', { a: 1 })
    const f = flavor('x', { a: 1 })
    isType.t<CanAssign<typeof b, typeof f>>()
  })
  test('without subject creates a typed flavor creator', () => {
    const createPerson = flavor('person')
    let person1 = createPerson(1)
    let person2 = createPerson(2)

    const createBlogPost = flavor('Blog')
    const blogPost = createBlogPost(1)

    person1 = person2
    person2 = person1

    isType.f<CanAssign<typeof blogPost, typeof person1>>()
  })
})
