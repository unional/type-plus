import { it, test } from '@jest/globals'

import { type $Type, type $Unknown, testType } from '../index.js'

test('union behavior of unknown', () => {
	testType.equal<unknown | null, unknown>(true)
	testType.equal<unknown | boolean, unknown>(true)
	testType.equal<unknown | true, unknown>(true)
	testType.equal<unknown | false, unknown>(true)
	testType.equal<unknown | number, unknown>(true)
	testType.equal<unknown | 1, unknown>(true)
	testType.equal<unknown | string, unknown>(true)
	testType.equal<unknown | '', unknown>(true)
	testType.equal<unknown | symbol, unknown>(true)
	testType.equal<unknown | bigint, unknown>(true)
	testType.equal<unknown | 1n, unknown>(true)
	testType.equal<unknown | {}, unknown>(true)
	testType.equal<unknown | { a: 1 }, unknown>(true)
	testType.equal<unknown | string[], unknown>(true)
	testType.equal<unknown | [], unknown>(true)
	testType.equal<unknown | Function, unknown>(true)
	testType.equal<unknown | (() => void), unknown>(true)

	testType.equal<unknown | any, any>(true)
	testType.equal<unknown | unknown, unknown>(true)
	testType.equal<unknown | never, unknown>(true)
	testType.equal<unknown | void, unknown>(true)
})

test('intersection behavior of unknown', () => {
	testType.equal<unknown & null, null>(true)
	testType.equal<unknown & boolean, boolean>(true)
	testType.equal<unknown & true, true>(true)
	testType.equal<unknown & false, false>(true)
	testType.equal<unknown & number, number>(true)
	testType.equal<unknown & 1, 1>(true)
	testType.equal<unknown & string, string>(true)
	testType.equal<unknown & '', ''>(true)
	testType.equal<unknown & symbol, symbol>(true)
	testType.equal<unknown & bigint, bigint>(true)
	testType.equal<unknown & 1n, 1n>(true)
	testType.equal<unknown & {}, {}>(true)
	testType.equal<unknown & { a: 1 }, { a: 1 }>(true)
	testType.equal<unknown & string[], string[]>(true)
	testType.equal<unknown & [], []>(true)
	testType.equal<unknown & Function, Function>(true)
	testType.equal<unknown & (() => void), () => void>(true)

	testType.equal<unknown & any, any>(true)
	testType.equal<unknown & unknown, unknown>(true)
	testType.equal<unknown & never, never>(true)
	testType.equal<unknown & void, void>(true)
})

it('is a unique branch', () => {
	testType.canAssign<$Type<'branch', 'something else'>, $Unknown>(false)
})
