import { assertType, Flavor, tryAssign } from '..'

test('underlying type can be assigned to Flavor', () => {
  type PersonId = Flavor<'Person', number>
  type BlogId = Flavor<'Blog', number>

  let personId: PersonId = 1
  let personId2: PersonId = 2

  personId = personId2
  personId2 = personId

  const blogId: BlogId = 1


  assertType<never>(tryAssign(blogId, personId))
  assertType<never>(tryAssign(personId, blogId))
})
