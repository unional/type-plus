import { it } from '@jest/globals'
import { isType } from '../index.js'
import type { Properties } from './properties.js'

it('returns never for non object types except unknown and any', () => {
	isType.equal<true, undefined, Properties<undefined>>()
	isType.equal<true, null, Properties<null>>()
	isType.equal<true, void, Properties<void>>()
	isType.equal<true, never, Properties<never>>()
	isType.equal<true, number, Properties<number>>()
	isType.equal<true, boolean, Properties<boolean>>()
	isType.equal<true, true, Properties<true>>()
	isType.equal<true, false, Properties<false>>()
	isType.equal<true, string, Properties<string>>()
	isType.equal<true, '', Properties<''>>()
	isType.equal<true, bigint, Properties<bigint>>()
	isType.equal<true, symbol, Properties<symbol>>()
})

it('returns empty object for unknown', () => {
	// type U1 = Properties<unknown>
	// type U2 = { [k in keyof unknown]: unknown[k] }
	// type U3 = { [k in never]: unknown[k] } // keyof unknown => never
	// type U4 = {}

	isType.equal<true, {}, Properties<unknown>>()
})

it('returns something weird for any', () => {
	// type A1 = Properties<any>
	// type A2 = { [k in keyof any]: any[k] }
	// type A3 = { [k in (string | number | symbol)]: any[k] } // keyof any => string | number | symbol
	// type A4 = { [k in string]: any[k] } // ??
	// type A5 = { [k in string]: any } // any[k] => any

	// @TODO: reason this
	isType.equal<true, { [k: string]: any }, Properties<any>>()
})

it('returns the properties of an object type', () => {
	type T = { a: number; b: string }
	isType.equal<true, { a: number; b: string }, Properties<T>>()
})

it('returns the properties of an object type with optional properties', () => {
	type T = { a: number; b?: string }
	isType.equal<true, { a: number; b?: string }, Properties<T>>()
})

it('returns the properties of an object type with readonly properties', () => {
	type T = { readonly a: number; readonly b: string }
	isType.equal<true, { readonly a: number; readonly b: string }, Properties<T>>()
})

it('returns the properties of an object type with readonly optional properties', () => {
	type T = { readonly a: number; readonly b?: string }
	isType.equal<true, { readonly a: number; readonly b?: string }, Properties<T>>()
})

it('returns the function methods', () => {
	type R = Properties<Function>

	// and others, just use one as an example
	isType.equal<true, (this: Function, thisArg: any, argArray?: any) => any, R['apply']>()
})

it('returns {} for actual function types', () => {
	// @TODO: reason this
	// this looks "wrong", but the reason is clear:
	// the function type does not describe the extra properties from the Function prototype
	isType.equal<true, {}, Properties<() => void>>()
})

it('skips function signatures from object', () => {
	// this is because the function signatures are not indexible.
	isType.equal<true, {}, Properties<{ (): void }>>()
	isType.equal<true, { a: 1 }, Properties<{ (): void; a: 1 }>>()
})

it('returns the properties of classes, including methods', () => {
	class Foo {
		f = 1
		foo() {}
	}
	class Boo extends Foo {
		b = 2
		boo() {}
	}

	isType.equal<true, Properties<Foo>, { f: number; foo(): void }>()
	isType.equal<true, Properties<Boo>, { f: number; b: number; boo(): void; foo(): void }>()
})
