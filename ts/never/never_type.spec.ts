import { type, type Is_Never, type NeverType, type Not_Never } from '../index.js'

it('returns never if T is never', () => {
	type.equal<NeverType<never>, never>(true)
})

it('returns Not_Never for other special types', () => {
	type.equal<NeverType<unknown>, Not_Never>(true)
	type.equal<NeverType<void>, Not_Never>(true)
	type.equal<NeverType<any>, Not_Never>(true)
})

test('returns Not_Never for other types', () => {
	type.equal<NeverType<undefined>, Not_Never>(true)
	type.equal<NeverType<null>, Not_Never>(true)
	type.equal<NeverType<number>, Not_Never>(true)
	type.equal<NeverType<boolean>, Not_Never>(true)
	type.equal<NeverType<true>, Not_Never>(true)
	type.equal<NeverType<false>, Not_Never>(true)
	type.equal<NeverType<string>, Not_Never>(true)
	type.equal<NeverType<''>, Not_Never>(true)
	type.equal<NeverType<symbol>, Not_Never>(true)
	type.equal<NeverType<bigint>, Not_Never>(true)
	type.equal<NeverType<{}>, Not_Never>(true)
	type.equal<NeverType<string[]>, Not_Never>(true)
	type.equal<NeverType<[]>, Not_Never>(true)
	type.equal<NeverType<Function>, Not_Never>(true)
	type.equal<NeverType<() => void>, Not_Never>(true)
})

it('returns Not_Never for union type', () => {
	type.equal<NeverType<never | 1>, Not_Never>(true)
})

it('returns never for intersection type', () => {
	type.never<never & { a: 1 }>(true)
	type.never<NeverType<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<NeverType<never, 1, 2>, 1>(true)
	type.equal<NeverType<0, 1, 2>, 2>(true)

	type.equal<NeverType<any, 1, 2>, 2>(true)
	type.equal<NeverType<unknown, 1, 2>, 2>(true)
	type.equal<NeverType<void, 1, 2>, 2>(true)
})

it('Is_Never and Not_Never is not the same', () => {
	type.equal<Is_Never, Not_Never>(false)
})

test('union behavior of never', () => {
	type.equal<never | undefined, undefined>(true)
	type.equal<never | null, null>(true)
	type.equal<never | boolean, boolean>(true)
	type.equal<never | true, true>(true)
	type.equal<never | false, false>(true)
	type.equal<never | number, number>(true)
	type.equal<never | 1, 1>(true)
	type.equal<never | string, string>(true)
	type.equal<never | '', ''>(true)
	type.equal<never | symbol, symbol>(true)
	type.equal<never | bigint, bigint>(true)
	type.equal<never | 1n, 1n>(true)
	type.equal<never | {}, {}>(true)
	type.equal<never | { a: 1 }, { a: 1 }>(true)
	type.equal<never | string[], string[]>(true)
	type.equal<never | [], []>(true)
	type.equal<never | never, never>(true)
	type.equal<never | (() => void), () => void>(true)

	type.equal<never | any, any>(true)
	type.equal<never | unknown, unknown>(true)
	type.equal<never | never, never>(true)
	type.equal<never | void, void>(true)
})

test('intersection behavior of never', () => {
	type.equal<never & undefined, never>(true)
	type.equal<never & null, never>(true)

	type.equal<never & boolean, never>(true)
	type.equal<never & true, never>(true)
	type.equal<never & false, never>(true)

	type.equal<never & number, never>(true)
	type.equal<never & 1, never>(true)
	type.equal<never & string, never>(true)
	type.equal<never & '', never>(true)
	type.equal<never & symbol, never>(true)
	type.equal<never & bigint, never>(true)
	type.equal<never & 1n, never>(true)

	type.equal<never & {}, never>(true)

	type.equal<never & { a: 1 }, never>(true)
	type.equal<never & string[], never>(true)
	type.equal<never & [], never>(true)
	type.equal<never & never, never>(true)
	type.equal<never & (() => void), never>(true)

	type.equal<never & any, never>(true)
	type.equal<never & unknown, never>(true)
	type.equal<never & never, never>(true)
	type.equal<never & void, never>(true)
})
