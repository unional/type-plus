import { assertType, brand, flavor, type } from '../index.js'

it('cannot assign from unbranded type', () => {
	const a = brand('a', { a: 1 })
	const b = { a: 1 }

	type.canAssign<typeof b, typeof a>(false)
})

it('can assign to unbranded type', () => {
	const a = { a: 1 }
	const b = brand('a', { a: 1 })
	type.canAssign<typeof b, typeof a>(true)
})

it('cannot assign between two different brand', () => {
	const a = brand('a', { a: 1 as const })
	const b = brand('b', { b: 'b' })

	type.canAssign<typeof a, typeof b>(false)
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

	type.canAssign<typeof a, typeof b>(false)
})

it('cannot assign from flavor with the same name', () => {
	const b = brand('x', { a: 1 })
	const f = flavor('x', { a: 1 })
	type.canAssign<typeof f, typeof b>(false)
})

it('can assign to flavor with the same name (this is a feature of flavor)', () => {
	const b = brand('x', { a: 1 })
	const f = flavor('x', { a: 1 })
	type.canAssign<typeof b, typeof f>(true)
})

it('creates a typed brand ceator when invoke without subject', () => {
	const createPerson = brand('person')
	let person1 = createPerson(1)
	let person2 = createPerson(2)

	const createBlogPost = brand('Blog')
	const blogPost = createBlogPost(1)

	person1 = person2
	person2 = person1

	type.equal<typeof blogPost, typeof person1>(false)
})

it('accepts null as subject', () => {
	const b = brand('x', null)
	type.never<typeof b>(false)
})

it('accepts undefined as subject', () => {
	const b = brand('x', undefined)
	type.never<typeof b>(false)
})

it('accepts function as subject', () => {
	const b = brand('x', function boo() {})
	const c = brand('x', function coo() {})

	type.never<typeof b>(false)
	type.canAssign<typeof b, typeof c>(true)
	type.canAssign<typeof c, typeof b>(true)
})

it('can assign to another function brand based on function assignment logic', () => {
	function af() {}
	function bf(_: string) {}
	function cf(_: number) {}
	const a = brand('x', af)
	const b = brand('x', bf)
	const c = brand('x', cf)

	type.canAssign<typeof af, typeof bf>(true)
	type.canAssign<typeof a, typeof b>(true)

	type.canAssign<typeof bf, typeof af>(false)
	type.canAssign<typeof b, typeof a>(false)

	type.canAssign<typeof cf, typeof bf>(false)
	type.canAssign<typeof c, typeof b>(false)
})
