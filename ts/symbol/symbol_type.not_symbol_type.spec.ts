import { testType, type NotSymbolType } from '../index.js'

it('returns never for symbol', () => {
	testType.never<NotSymbolType<symbol>>(true)

	const s = Symbol()
	testType.never<NotSymbolType<typeof s>>(true)
})

it('returns never for special types', () => {
	testType.equal<NotSymbolType<any>, any>(true)
	testType.equal<NotSymbolType<unknown>, unknown>(true)
	testType.equal<NotSymbolType<void>, void>(true)
	testType.equal<NotSymbolType<never>, never>(true)
})

test('returns never for singular types', () => {
	testType.equal<NotSymbolType<undefined>, undefined>(true)
	testType.equal<NotSymbolType<null>, null>(true)
	testType.equal<NotSymbolType<number>, number>(true)
	testType.equal<NotSymbolType<boolean>, boolean>(true)
	testType.equal<NotSymbolType<true>, true>(true)
	testType.equal<NotSymbolType<false>, false>(true)
	testType.equal<NotSymbolType<string>, string>(true)
	testType.equal<NotSymbolType<''>, ''>(true)
	testType.equal<NotSymbolType<bigint>, bigint>(true)
	testType.equal<NotSymbolType<{}>, {}>(true)
	testType.equal<NotSymbolType<string[]>, string[]>(true)
	testType.equal<NotSymbolType<[]>, []>(true)
	testType.equal<NotSymbolType<Function>, Function>(true)
	testType.equal<NotSymbolType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotSymbolType<symbol | 1>, symbol | 1>(true)
})

it('returns T for intersection type', () => {
	testType.never<NotSymbolType<symbol & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotSymbolType<symbol, 1, 2>, 2>(true)
	testType.equal<NotSymbolType<0, 1, 2>, 1>(true)

	testType.equal<NotSymbolType<any, 1, 2>, 1>(true)
	testType.equal<NotSymbolType<unknown, 1, 2>, 1>(true)
	testType.equal<NotSymbolType<never, 1, 2>, 1>(true)
	testType.equal<NotSymbolType<void, 1, 2>, 1>(true)
})
