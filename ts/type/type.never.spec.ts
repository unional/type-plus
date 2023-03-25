import { type } from './type.js'

it('expects never', () => {
	type.never<never>(true)
})

it('treat other special types as not true', () => {
	type.never<any>(false)
	type.never<unknown>(false)
	type.never<void>(false)
})

it('treat all other types as not true', () => {
	type.never<undefined>(false)
	type.never<null>(false)
	type.never<boolean>(false)
	type.never<true>(false)
	type.never<false>(false)
	type.never<number>(false)
	type.never<1>(false)
	type.never<string>(false)
	type.never<''>(false)
	type.never<symbol>(false)
	type.never<bigint>(false)
	type.never<{}>(false)
	type.never<string[]>(false)
	type.never<[]>(false)
	type.never<Function>(false)
	type.never<() => void>(false)
})

it('treat union type as not true', () => {
	type.never<never | false>(false)
	type.never<never | 1>(false)
})

it('treat non-never intersection type as not true', () => {
	type.never<{} & {}>(false)
})
