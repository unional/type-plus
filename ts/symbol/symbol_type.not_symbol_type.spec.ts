import { type, type NotSymbolType } from '../index.js'

it('returns never for symbol', () => {
	type.never<NotSymbolType<symbol>>(true)

	const s = Symbol()
	type.never<NotSymbolType<typeof s>>(true)
})

it('returns never for special types', () => {
	type.equal<NotSymbolType<any>, any>(true)
	type.equal<NotSymbolType<unknown>, unknown>(true)
	type.equal<NotSymbolType<void>, void>(true)
	type.equal<NotSymbolType<never>, never>(true)
})

test('returns never for singular types', () => {
	type.equal<NotSymbolType<undefined>, undefined>(true)
	type.equal<NotSymbolType<null>, null>(true)
	type.equal<NotSymbolType<number>, number>(true)
	type.equal<NotSymbolType<boolean>, boolean>(true)
	type.equal<NotSymbolType<true>, true>(true)
	type.equal<NotSymbolType<false>, false>(true)
	type.equal<NotSymbolType<string>, string>(true)
	type.equal<NotSymbolType<''>, ''>(true)
	type.equal<NotSymbolType<bigint>, bigint>(true)
	type.equal<NotSymbolType<{}>, {}>(true)
	type.equal<NotSymbolType<string[]>, string[]>(true)
	type.equal<NotSymbolType<[]>, []>(true)
	type.equal<NotSymbolType<Function>, Function>(true)
	type.equal<NotSymbolType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotSymbolType<symbol | 1>, symbol | 1>(true)
})

it('returns T for intersection type', () => {
	type.never<NotSymbolType<symbol & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotSymbolType<symbol, 1, 2>, 2>(true)
	type.equal<NotSymbolType<0, 1, 2>, 1>(true)

	type.equal<NotSymbolType<any, 1, 2>, 1>(true)
	type.equal<NotSymbolType<unknown, 1, 2>, 1>(true)
	type.equal<NotSymbolType<never, 1, 2>, 1>(true)
	type.equal<NotSymbolType<void, 1, 2>, 1>(true)
})
