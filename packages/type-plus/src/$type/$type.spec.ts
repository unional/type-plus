import { it } from '@jest/globals'
import { type $Type, testType } from '../index.js'

it('is unique for each value', () => {
	type X = $Type<'a', 'b'>
	type Y = $Type<'a', 'c'>
	// @ts-ignore
	let _x: X = {} as any
	const y: Y = {} as any

	// Y is not assignable to X
	// @ts-expect-error
	_x = y
})

it('can be used without value', () => {
	type X = $Type<'a'>

	const _x: X = {} as any

	testType.equal<typeof _x, $Type<'a'>>(true)
})

it('same type is assignable', () => {
	type X = $Type<'a'>
	type Y = $Type<'a'>

	testType.equal<X, Y>(true)
})

it('can be used with primitive types', () => {
	testType.equal<$Type<'a', null>['_$value'], null>(true)
	testType.equal<$Type<'a', undefined>['_$value'], undefined>(true)
	testType.equal<$Type<'a', void>['_$value'], void>(true)
	testType.equal<$Type<'a', unknown>['_$value'], unknown>(true)
	testType.equal<$Type<'a', never>['_$value'], never>(true)
	testType.equal<$Type<'a', boolean>['_$value'], boolean>(true)
	testType.equal<$Type<'a', true>['_$value'], true>(true)
	testType.equal<$Type<'a', false>['_$value'], false>(true)
	testType.equal<$Type<'a', number>['_$value'], number>(true)
	testType.equal<$Type<'a', 123>['_$value'], 123>(true)
	testType.equal<$Type<'a', string>['_$value'], string>(true)
	testType.equal<$Type<'a', 'abc'>['_$value'], 'abc'>(true)
	testType.equal<$Type<'a', symbol>['_$value'], symbol>(true)
	testType.equal<$Type<'a', bigint>['_$value'], bigint>(true)
	testType.equal<$Type<'a', 1n>['_$value'], 1n>(true)
	testType.equal<$Type<'a', Function>['_$value'], Function>(true)
})

it('can be used with object', () => {
	type X = $Type<'a', { a: 1 }>

	testType.equal<X['_$value'], { a: 1 }>(true)
	testType.equal<X['_$value']['a'], 1>(true)
	testType.equal<X['a'], 1>(true)
	testType.canAssign<X, { a: 1 }>(true)
	testType.canAssign<{ a: 1 }, X>(false)
})

it('can set bare usage', () => {
	type X = $Type<'a', { a: 1 }, { bare: true }>

	testType.equal<X['_$value'], { a: 1 }>(true)
	testType.canAssign<X, { a: 1 }>(false)
})
