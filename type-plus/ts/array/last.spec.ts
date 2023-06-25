import { test } from '@jest/globals'
import { testType, type AnyFunction } from '../index.js'
import type { Last } from './last.js'

test('any array', () => {
	type A = Last<any[]>
	testType.equal<A, any>(true)
})

test('never array', () => {
	type A = Last<never[]>
	testType.equal<A, never>(true)
})

test('typed array', () => {
	type A = Last<string[]>
	testType.equal<A, string>(true)
})

test('function array', () => {
	type A = Last<AnyFunction[]>
	testType.equal<A, AnyFunction>(true)
})

test('empty tuple gets undefined', () => {
	type A = Last<[]>
	testType.equal<A, undefined>(true)
})

test('tuple with function', () => {
	type A = Last<[number, AnyFunction]>
	testType.equal<A, AnyFunction>(true)
})
