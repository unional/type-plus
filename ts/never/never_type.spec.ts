import { testType, type Is_Never, type NeverType, type Not_Never } from '../index.js'

it('returns never if T is never', () => {
	testType.equal<NeverType<never>, never>(true)
})

it('returns Not_Never for other special types', () => {
	testType.equal<NeverType<unknown>, Not_Never>(true)
	testType.equal<NeverType<void>, Not_Never>(true)
	testType.equal<NeverType<any>, Not_Never>(true)
})

test('returns Not_Never for other types', () => {
	testType.equal<NeverType<undefined>, Not_Never>(true)
	testType.equal<NeverType<null>, Not_Never>(true)
	testType.equal<NeverType<number>, Not_Never>(true)
	testType.equal<NeverType<boolean>, Not_Never>(true)
	testType.equal<NeverType<true>, Not_Never>(true)
	testType.equal<NeverType<false>, Not_Never>(true)
	testType.equal<NeverType<string>, Not_Never>(true)
	testType.equal<NeverType<''>, Not_Never>(true)
	testType.equal<NeverType<symbol>, Not_Never>(true)
	testType.equal<NeverType<bigint>, Not_Never>(true)
	testType.equal<NeverType<{}>, Not_Never>(true)
	testType.equal<NeverType<string[]>, Not_Never>(true)
	testType.equal<NeverType<[]>, Not_Never>(true)
	testType.equal<NeverType<Function>, Not_Never>(true)
	testType.equal<NeverType<() => void>, Not_Never>(true)
})

it('returns Not_Never for union type', () => {
	testType.equal<NeverType<never | 1>, Not_Never>(true)
})

it('returns never for intersection type', () => {
	testType.never<never & { a: 1 }>(true)
	testType.never<NeverType<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NeverType<never, 1, 2>, 1>(true)
	testType.equal<NeverType<0, 1, 2>, 2>(true)

	testType.equal<NeverType<any, 1, 2>, 2>(true)
	testType.equal<NeverType<unknown, 1, 2>, 2>(true)
	testType.equal<NeverType<void, 1, 2>, 2>(true)
})

it('Is_Never and Not_Never is not the same', () => {
	testType.equal<Is_Never, Not_Never>(false)
})

test('union behavior of never', () => {
	testType.equal<never | undefined, undefined>(true)
	testType.equal<never | null, null>(true)
	testType.equal<never | boolean, boolean>(true)
	testType.equal<never | true, true>(true)
	testType.equal<never | false, false>(true)
	testType.equal<never | number, number>(true)
	testType.equal<never | 1, 1>(true)
	testType.equal<never | string, string>(true)
	testType.equal<never | '', ''>(true)
	testType.equal<never | symbol, symbol>(true)
	testType.equal<never | bigint, bigint>(true)
	testType.equal<never | 1n, 1n>(true)
	testType.equal<never | {}, {}>(true)
	testType.equal<never | { a: 1 }, { a: 1 }>(true)
	testType.equal<never | string[], string[]>(true)
	testType.equal<never | [], []>(true)
	testType.equal<never | never, never>(true)
	testType.equal<never | (() => void), () => void>(true)

	testType.equal<never | any, any>(true)
	testType.equal<never | unknown, unknown>(true)
	testType.equal<never | never, never>(true)
	testType.equal<never | void, void>(true)
})

test('intersection behavior of never', () => {
	testType.equal<never & undefined, never>(true)
	testType.equal<never & null, never>(true)

	testType.equal<never & boolean, never>(true)
	testType.equal<never & true, never>(true)
	testType.equal<never & false, never>(true)

	testType.equal<never & number, never>(true)
	testType.equal<never & 1, never>(true)
	testType.equal<never & string, never>(true)
	testType.equal<never & '', never>(true)
	testType.equal<never & symbol, never>(true)
	testType.equal<never & bigint, never>(true)
	testType.equal<never & 1n, never>(true)

	testType.equal<never & {}, never>(true)

	testType.equal<never & { a: 1 }, never>(true)
	testType.equal<never & string[], never>(true)
	testType.equal<never & [], never>(true)
	testType.equal<never & never, never>(true)
	testType.equal<never & (() => void), never>(true)

	testType.equal<never & any, never>(true)
	testType.equal<never & unknown, never>(true)
	testType.equal<never & never, never>(true)
	testType.equal<never & void, never>(true)
})
