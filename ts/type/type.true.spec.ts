import { type } from './type.js'

it('accepts true and false', () => {
	type.true<true>(true)
	type.true<false>(false)
})

it('treat boolean as not true', () => {
	type.true<boolean>(false)
})

it('treat special types as not true', () => {
	type.true<any>(false)
	type.true<unknown>(false)
	type.true<never>(false)
	type.true<void>(false)
})

it('treat all other types as not true', () => {
	type.true<undefined>(false)
	type.true<null>(false)
	type.true<number>(false)
	type.true<string>(false)
	type.true<''>(false)
	type.true<symbol>(false)
	type.true<bigint>(false)
	type.true<{}>(false)
	type.true<string[]>(false)
	type.true<[]>(false)
	type.true<Function>(false)
	type.true<() => void>(false)
})

it('treat union type as not true', () => {
	type.true<true | false>(false)
	type.true<true | 1>(false)
})

it('treat intersection type as not true', () => {
	type.true<true & 1>(false)
	type.true<{} & {}>(false)
})
