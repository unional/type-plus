import { Flavor, tryAssign, typeAssert } from '.';

test('underlying type can be assigned to Flavor', () => {
  type PersonId = Flavor<'Person', number>
  type BlogId = Flavor<'Blog', number>

  let personId: PersonId = 1
  let personId2: PersonId = 2

  personId = personId2
  personId2 = personId

  let blogId: BlogId = 1


  typeAssert.isNever(tryAssign(blogId, personId))
  typeAssert.isNever(tryAssign(personId, blogId))
})
