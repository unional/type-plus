import { AnyFunction, type } from '../index.js'
import type { Last } from './last.js'

test('any array', () => {
	type A = Last<any[]>
	type.equal<A, any>(true)
})

test('never array', () => {
	type A = Last<never[]>
	type.equal<A, never>(true)
})

test('typed array', () => {
	type A = Last<string[]>
	type.equal<A, string>(true)
})

test('function array', () => {
	type A = Last<AnyFunction[]>
	type.equal<A, AnyFunction>(true)
})

test('empty tuple gets undefined', () => {
	type A = Last<[]>
	type.equal<A, undefined>(true)
})

test('tuple with function', () => {
	type A = Last<[number, AnyFunction]>
	type.equal<A, AnyFunction>(true)
})
