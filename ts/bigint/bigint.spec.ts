import { type } from '../index.js'

test('union behavior of bigint', () => {
	type.equal<bigint | undefined, bigint | undefined>(true)
	type.equal<bigint | null, bigint | null>(true)
	type.equal<bigint | boolean, bigint | boolean>(true)
	type.equal<bigint | true, bigint | true>(true)
	type.equal<bigint | false, bigint | false>(true)
	type.equal<bigint | number, bigint | number>(true)
	type.equal<bigint | 1, bigint | 1>(true)
	type.equal<bigint | string, bigint | string>(true)
	type.equal<bigint | '', bigint | ''>(true)
	type.equal<bigint | symbol, bigint | symbol>(true)

	type.equal<bigint | 1n, bigint>(true)

	type.equal<bigint | {}, bigint | {}>(true)
	type.equal<bigint | { a: 1 }, bigint | { a: 1 }>(true)
	type.equal<bigint | string[], bigint | string[]>(true)
	type.equal<bigint | [], bigint | []>(true)
	type.equal<bigint | Function, bigint | Function>(true)
	type.equal<bigint | (() => void), bigint | (() => void)>(true)

	type.equal<bigint | any, any>(true)
	type.equal<bigint | unknown, unknown>(true)
	type.equal<bigint | never, bigint>(true)
	type.equal<bigint | void, bigint | void>(true)
})

test('intersection behavior of bigint', () => {
	type.equal<bigint & undefined, never>(true)
	type.equal<bigint & null, never>(true)
	type.equal<bigint & boolean, never>(true)
	type.equal<bigint & true, never>(true)
	type.equal<bigint & false, never>(true)
	type.equal<bigint & number, never>(true)

	type.equal<bigint & 1, never>(true)

	type.equal<bigint & string, never>(true)
	type.equal<bigint & '', never>(true)
	type.equal<bigint & symbol, never>(true)

	type.equal<bigint & bigint, bigint>(true)
	type.equal<bigint & 1n, 1n>(true)

	type.equal<bigint & {}, bigint & {}>(true)
	type.equal<bigint & { a: 1 }, bigint & { a: 1 }>(true)
	type.equal<bigint & string[], bigint & string[]>(true)
	type.equal<bigint & [], bigint & []>(true)
	type.equal<bigint & Function, bigint & Function>(true)
	type.equal<bigint & (() => void), bigint & (() => void)>(true)

	type.equal<bigint & any, any>(true)
	type.equal<bigint & unknown, bigint>(true)
	type.equal<bigint & never, never>(true)
	type.equal<bigint & void, never>(true)
})
