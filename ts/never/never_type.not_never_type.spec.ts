import { Is_Never, type, type NotNeverType } from '../index.js'

it('returns `is_never` if T is never', () => {
	type.equal<NotNeverType<never>, Is_Never>(true)
})

it('returns T for other special types', () => {
	type.equal<NotNeverType<unknown>, unknown>(true)
	type.equal<NotNeverType<void>, void>(true)
	type.equal<NotNeverType<any>, any>(true)
})

test('returns T for other types', () => {
	type.equal<NotNeverType<undefined>, undefined>(true)
	type.equal<NotNeverType<null>, null>(true)
	type.equal<NotNeverType<number>, number>(true)
	type.equal<NotNeverType<boolean>, boolean>(true)
	type.equal<NotNeverType<true>, true>(true)
	type.equal<NotNeverType<false>, false>(true)
	type.equal<NotNeverType<string>, string>(true)
	type.equal<NotNeverType<''>, ''>(true)
	type.equal<NotNeverType<symbol>, symbol>(true)
	type.equal<NotNeverType<bigint>, bigint>(true)
	type.equal<NotNeverType<{}>, {}>(true)
	type.equal<NotNeverType<string[]>, string[]>(true)
	type.equal<NotNeverType<[]>, []>(true)
	type.equal<NotNeverType<Function>, Function>(true)
	type.equal<NotNeverType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotNeverType<never | 1>, 1>(true)
})

it('returns Is_Never for intersection type', () => {
	type.equal<NotNeverType<never & { a: 1 }>, Is_Never>(true)
})

it('can override Then/Else', () => {
	type.equal<NotNeverType<never, 1, 2>, 2>(true)
	type.equal<NotNeverType<0, 1, 2>, 1>(true)

	type.equal<NotNeverType<any, 1, 2>, 1>(true)
	type.equal<NotNeverType<unknown, 1, 2>, 1>(true)
	type.equal<NotNeverType<void, 1, 2>, 1>(true)
})
