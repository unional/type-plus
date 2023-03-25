import { type } from './type.js'

it('accepts true and false', () => {
	type.false<false>(true)
	type.false<true>(false)
})

it('treat boolean as not true', () => {
	type.false<boolean>(false)
})

it('treat special types as not true', () => {
	type.false<any>(false)
	type.false<unknown>(false)
	type.false<never>(false)
	type.false<void>(false)
})

it('treat all other types as not true', () => {
	type.false<undefined>(false)
	type.false<null>(false)
	type.false<number>(false)
	type.false<string>(false)
	type.false<''>(false)
	type.false<symbol>(false)
	type.false<bigint>(false)
	type.false<{}>(false)
	type.false<string[]>(false)
	type.false<[]>(false)
	type.false<Function>(false)
	type.false<() => void>(false)
})

it('treat union type as not true', () => {
	type.false<true | false>(false)
	type.false<true | 1>(false)
})

it('treat intersection type as not true', () => {
	type.false<true & 1>(false)
	type.false<{} & {}>(false)
})
