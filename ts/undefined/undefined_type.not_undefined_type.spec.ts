import { type, type NotUndefinedType } from '../index.js'

it('returns never for undefined', () => {
	type.never<NotUndefinedType<undefined>>(true)
})

it('returns T for special types', () => {
	type.equal<NotUndefinedType<any>, any>(true)
	type.equal<NotUndefinedType<unknown>, unknown>(true)
	type.equal<NotUndefinedType<void>, void>(true)
	type.equal<NotUndefinedType<never>, never>(true)
})

test('returns T for other types', () => {
	type.equal<NotUndefinedType<null>, null>(true)
	type.equal<NotUndefinedType<number>, number>(true)
	type.equal<NotUndefinedType<boolean>, boolean>(true)
	type.equal<NotUndefinedType<true>, true>(true)
	type.equal<NotUndefinedType<false>, false>(true)
	type.equal<NotUndefinedType<string>, string>(true)
	type.equal<NotUndefinedType<''>, ''>(true)
	type.equal<NotUndefinedType<symbol>, symbol>(true)
	type.equal<NotUndefinedType<bigint>, bigint>(true)
	type.equal<NotUndefinedType<{}>, {}>(true)
	type.equal<NotUndefinedType<string[]>, string[]>(true)
	type.equal<NotUndefinedType<[]>, []>(true)
	type.equal<NotUndefinedType<Function>, Function>(true)
	type.equal<NotUndefinedType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotUndefinedType<undefined | 1>, undefined | 1>(true)
})

it('returns T as undefined & any => any', () => {
	type.equal<undefined & any, any>(true)
	type.equal<NotUndefinedType<undefined & any>, undefined & any>(true)
})

it('returns never as undefined & unknown => undefined', () => {
	type.equal<undefined & unknown, undefined>(true)
	type.never<NotUndefinedType<undefined & unknown>>(true)
})

it('returns never as undefined & void => undefined', () => {
	type.equal<undefined & void, undefined>(true)
	type.never<NotUndefinedType<undefined & void>>(true)
})

it('returns T as undefined & never => never', () => {
	type.equal<NotUndefinedType<undefined & never>, undefined & never, never>(true)
})

it('returns T as undefined & <others> => never', () => {
	type.equal<NotUndefinedType<undefined & null>, undefined & null, never>(true)
	type.equal<NotUndefinedType<undefined & number>, undefined & number, never>(true)
	type.equal<NotUndefinedType<undefined & 1>, undefined & 1, never>(true)
	type.equal<NotUndefinedType<undefined & boolean>, undefined & boolean, never>(true)
	type.equal<NotUndefinedType<undefined & true>, undefined & true, never>(true)
	type.equal<NotUndefinedType<undefined & false>, undefined & false, never>(true)
	type.equal<NotUndefinedType<undefined & string>, undefined & string, never>(true)
	type.equal<NotUndefinedType<undefined & ''>, undefined & '', never>(true)
	type.equal<NotUndefinedType<undefined & symbol>, undefined & symbol, never>(true)
	type.equal<NotUndefinedType<undefined & bigint>, undefined & bigint, never>(true)
	type.equal<NotUndefinedType<undefined & 1n>, undefined & 1n, never>(true)
	type.equal<NotUndefinedType<undefined & {}>, undefined & {}, never>(true)
	type.equal<NotUndefinedType<undefined & { a: 1 }>, undefined & { a: 1 }, never>(true)
	type.equal<NotUndefinedType<undefined & string[]>, undefined & string[], never>(true)
	type.equal<NotUndefinedType<undefined & []>, undefined & [], never>(true)
	type.equal<NotUndefinedType<undefined & Function>, undefined & Function, never>(true)
	type.equal<NotUndefinedType<undefined & (() => void)>, undefined & (() => void), never>(true)
})

it('can override Then/Else', () => {
	type.equal<NotUndefinedType<undefined, 1, 2>, 2>(true)
	type.equal<NotUndefinedType<any, 1, 2>, 1>(true)
	type.equal<NotUndefinedType<unknown, 1, 2>, 1>(true)
	type.equal<NotUndefinedType<never, 1, 2>, 1>(true)
	type.equal<NotUndefinedType<void, 1, 2>, 1>(true)
})
