import { assertType, Flavor, TypeEquals } from '..'
import { flavor } from './Flavor'

test('underlying type can be assigned to Flavor', () => {
  type PersonId = Flavor<'Person', number>
  type BlogId = Flavor<'Blog', number>

  let personId: PersonId = 1
  let personId2: PersonId = 2

  personId = personId2
  personId2 = personId

  const blogId: BlogId = 1


  assertType.isFalse(false as TypeEquals<typeof blogId, typeof personId>)
})

describe('flavor()', () => {
  test('basic use case', () => {
    const a = flavor('a', { a: 1 as const })
    const b = flavor('b', { b: 'b' })

    assertType.isFalse(false as TypeEquals<typeof a, typeof b>)
    assertType<1>(a.a)
    assertType<string>(b.b)
  })
  test('without subject creates a typed flavor creator', () => {
    const createPerson = flavor('person')
    let person1 = createPerson(1)
    let person2 = createPerson(2)

    const createBlogPost = flavor('Blog')
    const blogPost = createBlogPost(1)

    person1 = person2
    person2 = person1

    assertType.isFalse(false as TypeEquals<typeof blogPost, typeof person1>)
  })
})
