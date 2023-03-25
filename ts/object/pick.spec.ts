import { assertType, canAssign, IsEqual, isType, Pick, pick, record } from '../index.js'

describe(`Pick<T, K>`, () => {
	test('distributive pick', () => {
		type Action = InvokeAction | ReturnAction

		type InvokeAction = {
			type: 'invoke'
			id: string
			payload: string[]
		}

		type ReturnAction = {
			type: 'return'
			id: string
			payload: string
		}

		const x: Pick<Action, 'type' | 'payload'> = { type: 'invoke', payload: [] }

		const actions: Action[] = []

		actions.push({ ...x, id: '1' })
	})

	test('distributive pick with disjoined keys', () => {
		type Union =
			| {
					type: 'A'
					foo: string
			  }
			| {
					type: 'B'
					foo: string
					bar: string
			  }
		type Id<T> = { [P in keyof T]: T[P] }
		let x: Id<Pick<Union, 'type' | 'bar'>> = { type: 'A' }
		x = { type: 'B', bar: 'bar' }

		expect(x.bar).toBe('bar')
	})

	test('intersection types with generic', () => {
		type Foo = { a: string; b: string }
		function foo<T>(input: Pick<Foo & T, 'a'>): void {
			assertType.isString(input.a)
		}
		foo({ a: '1' })
	})

	test('optional property remains optional', () => {
		type Foo = { a?: string; b: string }
		type A = Pick<Foo, 'a'>
		assertType.isTrue(canAssign<A>()({}))
	})

	test('pick never gets empty object', () => {
		type A = { a: number }
		type S = Pick<A, never>
		type K = keyof S
		assertType.isTrue(true as IsEqual<K, never>)
	})
})

describe(`${pick.name}()`, () => {
	it('picks properties from object', () => {
		const actual = pick({ a: 1, b: 2 }, 'a')

		expect(actual).toEqual({ a: 1 })
	})

	it('supports more than 12 arguments', () => {
		const actual = pick({ a: 1, b: 1, c: 1 }, 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b')

		expect(actual).toEqual({ a: 1, b: 1 })
		isType.equal<true, 'a' | 'b', keyof typeof actual>()
	})

	it('maintains the prototype null-ness', () => {
		expect(Object.getPrototypeOf(pick({ a: 1 }, 'a'))).not.toEqual(null)
		expect(Object.getPrototypeOf(pick(record({ a: 1 }), 'a'))).toEqual(null)
	})
})
