import { createBrandCreator, tryAssign, assertType } from '.';

describe('createBrandCreator()', () => {
  test('creates a typed brand creator', () => {
    const createPersonId = createBrandCreator<'Person', number>()
    let personId = createPersonId(1)
    let personId2 = createPersonId(2)

    const createBlogPostId = createBrandCreator<'Blog', number>()
    let blogPostId = createBlogPostId(1)

    personId = personId2
    personId2 = personId

    assertType.isNever(tryAssign(blogPostId, personId))
    assertType.isNever(tryAssign(personId, blogPostId))
  })
})
