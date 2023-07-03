import { it } from '@jest/globals'
import { testType, type AnyFunction, type Last } from '../index.js'

it('gets the type of an array', () => {
	testType.equal<Last<any[]>, any>(true)
	testType.equal<Last<never[]>, never>(true)
	testType.equal<Last<string[]>, string>(true)
	testType.equal<Last<AnyFunction[]>, AnyFunction>(true)
	testType.equal<Last<Array<string | number>>, string | number>(true)
})

it('gets never for empty tuple', () => {
	testType.equal<Last<[]>, never>(true)
})

it('gets the last entry of a tuple', () => {
	testType.equal<Last<[number, AnyFunction]>, AnyFunction>(true)
})

it('can override empty tuple behavior', () => {
	testType.equal<Last<[], { empty_tuple: undefined }>, undefined>(true)
})
