import { assertType, brand, CanAssign, Equal, flavor } from '../index.js'
import { isType } from '../predicates/index.js'

describe('brand()', () => {
  it('cannot assign from unbranded type', () => {
    const a = brand('a', { a: 1 })
    const b = { a: 1 }
    isType.f<CanAssign<typeof b, typeof a>>()
  })
  it('can assign to unbranded type', () => {
    const a = { a: 1 }
    const b = brand('a', { a: 1 })
    isType.t<CanAssign<typeof b, typeof a>>()
  })

  it('cannot assign between two different brand', () => {
    const a = brand('a', { a: 1 as const })
    const b = brand('b', { b: 'b' })

    isType.f<CanAssign<typeof a, typeof b>>()
    assertType<1>(a.a)
    assertType<string>(b.b)
  })
  it('can assign betwen same brand of the same type', () => {
    const a = brand('a', { a: 1 })
    let b = brand('a', { a: 2 })

    b = a
    expect(b.a).toBe(1)
  })

  it('cannot assign betwen same brand with different type', () => {
    const a = brand('a', { a: 1 })
    const b = brand('a', { b: 2 })

    isType.f<CanAssign<typeof a, typeof b>>()
  })

  it('cannot assign from flavor with the same name', () => {
    const b = brand('x', { a: 1 })
    const f = flavor('x', { a: 1 })
    isType.f<CanAssign<typeof f, typeof b>>()
  })

  it('can assign to flavor with the same name (this is a feature of flavor)', () => {
    const b = brand('x', { a: 1 })
    const f = flavor('x', { a: 1 })
    isType.t<CanAssign<typeof b, typeof f>>()
  })

  it('creates a typed brand ceator when invoke without subject', () => {
    const createPerson = brand('person')
    let person1 = createPerson(1)
    let person2 = createPerson(2)

    const createBlogPost = brand('Blog')
    const blogPost = createBlogPost(1)

    person1 = person2
    person2 = person1

    isType.f<Equal<typeof blogPost, typeof person1>>()
  })

  it('accepts null as subject', () => {
    const b = brand('x', null)
    isType.equal<false, never, typeof b>()
  })

  it('accepts undefined as subject', () => {
    const b = brand('x', undefined)
    isType.equal<false, never, typeof b>()
  })

  it('accepts function as subject', () => {
    const b = brand('x', function boo() { })
    const c = brand('x', function coo() { })
    isType.equal<false, never, typeof b>()
    isType.t<CanAssign<typeof b, typeof c>>()
    isType.t<CanAssign<typeof c, typeof b>>()
  })

  it('can assign to another function brand based on function assignment logic', () => {
    function af() { }
    function bf(_: string) { }
    function cf(_: number) { }
    const a = brand('x', af)
    const b = brand('x', bf)
    const c = brand('x', cf)

    isType.t<CanAssign<typeof af, typeof bf>>()
    isType.t<CanAssign<typeof a, typeof b>>()

    isType.f<CanAssign<typeof bf, typeof af>>()
    isType.f<CanAssign<typeof b, typeof a>>()

    isType.f<CanAssign<typeof bf, typeof cf>>()
    isType.f<CanAssign<typeof b, typeof c>>()

    isType.f<CanAssign<typeof cf, typeof bf>>()
    isType.f<CanAssign<typeof c, typeof b>>()
  })
})
