import { isType, type ArrayType } from '../index.js'

it('returns the array', () => {
	isType.equal<true, ArrayType<string[]>, string[]>()
})

it('returns never for tuple', () => {
	isType.never<ArrayType<[]>>()
	isType.never<ArrayType<[1]>>()
})

it('can override Then/Else', () => {
	isType.equal<true, ArrayType<string[], 1, 2>, 1>()
	isType.equal<true, ArrayType<[], 1, 2>, 2>()
})
