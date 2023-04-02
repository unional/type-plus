import { testType, type BigintType } from '../index.js'

it('returns T if T is bigint', () => {
	testType.equal<BigintType<bigint>, bigint>(true)
})

it('returns T if T is bigint literals', () => {
	testType.equal<BigintType<0n>, 0n>(true)
	testType.equal<BigintType<1n>, 1n>(true)
	testType.equal<BigintType<-1n>, -1n>(true)
	testType.equal<BigintType<11111111111111111111111111111111n>, 11111111111111111111111111111111n>(true)
})

it('returns never for special types', () => {
	testType.never<BigintType<any>>(true)
	testType.never<BigintType<unknown>>(true)
	testType.never<BigintType<void>>(true)
	testType.never<BigintType<never>>(true)
})

test('returns never for other types', () => {
	testType.never<BigintType<undefined>>(true)
	testType.never<BigintType<null>>(true)
	testType.never<BigintType<boolean>>(true)
	testType.never<BigintType<true>>(true)
	testType.never<BigintType<false>>(true)
	testType.never<BigintType<number>>(true)
	testType.never<BigintType<1>>(true)
	testType.never<BigintType<string>>(true)
	testType.never<BigintType<''>>(true)
	testType.never<BigintType<symbol>>(true)
	testType.never<BigintType<{}>>(true)
	testType.never<BigintType<string[]>>(true)
	testType.never<BigintType<[]>>(true)
	testType.never<BigintType<Function>>(true)
	testType.never<BigintType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<BigintType<bigint | 1>>(true)
	testType.never<BigintType<bigint | 'a'>>(true)
})

it('returns T for intersection type', () => {
	testType.equal<BigintType<bigint & { a: 1 }>, bigint & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<BigintType<bigint, 1, 2>, 1>(true)
	testType.equal<BigintType<1n, 1, 2>, 1>(true)

	testType.equal<BigintType<any, 1, 2>, 2>(true)
	testType.equal<BigintType<unknown, 1, 2>, 2>(true)
	testType.equal<BigintType<never, 1, 2>, 2>(true)
	testType.equal<BigintType<void, 1, 2>, 2>(true)
})
