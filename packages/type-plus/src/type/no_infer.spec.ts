// https://github.com/microsoft/TypeScript/issues/14829

// alternative implementations that don't work:
// export type NoInfer<T> = T & {}
// export type NoInfer<T> = T & { [K in keyof T]: T[K] }
// export type NoInfer<T> = [T][T extends any ? 0 : never]
// export type NoInfer<T> = T extends infer S ? S : never;

import { it } from '@jest/globals'

import { testType } from '../index.js'
import { type UnionToIntersection } from '../union/union_to_intersection.js'
import { type NoInfer } from './no_infer.js'

function id<T>(v: T): T {
	return v
}

function noInfer<T>(v: NoInfer<T>): T {
	return v
}

it('infers T when used directly', () => {
	const x = id({ a: 1 })
	testType.equal<typeof x, { a: number }>(true)

	const y = noInfer({ a: 1 })
	testType.equal<typeof y, { a: number }>(true)
})

it('works with primitive types', () => {
	id<undefined>(noInfer(undefined))
	id<null>(noInfer(null))
	id<boolean>(noInfer(true))
	id<true>(noInfer(true))
	id<false>(noInfer(false))
	id<number>(noInfer(123))
	id<123>(noInfer(123))
	id<string>(noInfer('string'))
	id<'abc'>(noInfer('abc'))
	id<symbol>(noInfer(Symbol()))
	id<bigint>(noInfer(123n))
	id<123n>(noInfer(123n))
	id<{}>(noInfer({}))
	id<{ a: 1 }>(noInfer({ a: 1 }))
	id<string[]>(noInfer(['a']))
	id<[]>(noInfer([]))
	id<Function>(noInfer(() => {}))
	id<() => void>(noInfer(() => {}))
})

it('can be used to control which param to infer from', () => {
	class Animal {
		move() {}
	}
	class Dog extends Animal {
		woof() {}
	}

	function inferred<T>(value: T, _fn: () => T) {
		return value
	}
	// Wanted an error here - getDefault() ought to return same type as 'value'
	const notWeWant = inferred(new Dog(), () => new Animal())
	testType.equal<typeof notWeWant, Animal>(true)
	testType.equal<typeof notWeWant, Dog>(false)

	function notInferred<T>(_value: T, _fn: () => NoInfer<T>) {}
	// Wanted an error here - getDefault() ought to return same type as 'value'
	// @ts-expect-error
	notInferred(new Dog(), () => new Animal())
})

it('can used to improve assertEqual(a,b)', () => {
	function assertEqual<T>(a: T, b: NoInfer<T>) {
		return a === b
	}
	const a = assertEqual(1, 1)
	const b = assertEqual(1, 2)
	testType.equal<typeof a, boolean>(true)
	testType.equal<typeof b, boolean>(true)

	assertEqual(123, 324)

	// @ts-expect-error
	assertEqual(123, '123')

	// @ts-expect-error
	assertEqual({ x: 1 }, { x: 1, y: 2 })
})

it('invoke vs test', () => {
	function invoke<T, R>(func: (value: T) => R, value: NoInfer<T>): R {
		return func(value)
	}

	function test(value: { x: number }): number {
		return value.x
	}

	invoke(test, { x: 1 })

	// @ts-expect-error
	invoke(test, { x: 1, y: 2 })
})

it('', () => {
	// https://github.com/microsoft/TypeScript/issues/14829#issuecomment-520191642
	class Animal {
		move() {}
	}
	class Dog extends Animal {
		woof() {}
	}
	class Cat extends Animal {
		meow() {}
	}

	type K<T> = T extends any ? { [k in keyof T]: string } : never

	function doSomethingNoInferAjafff<T extends Dog | Cat>(
		_getDefault: (x: any) => T,
		_value: UnionToIntersection<K<NoInfer<T>>>
	) {}

	// TODO: This should pass
	// Use a function parameter
	// @ts-expect-error
	doSomethingNoInferAjafff(x => new Dog(), { woof: '', move: '' })

	doSomethingNoInferAjafff((_x: any) => new Dog(), { woof: '', move: '' })

	// Do not use a function param
	doSomethingNoInferAjafff(() => new Dog(), { woof: '', move: '' })
})
