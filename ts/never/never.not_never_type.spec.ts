import { type, type NotNeverType, type PrimitiveTypes, Is_Never } from '../index.js'

it('returns `is_never` for never', () => {
	type.equal<NotNeverType<never>, Is_Never>(true)
})

it('returns never for other special types', () => {
	type.never<NotNeverType<unknown>>(false)
	type.never<NotNeverType<void>>(false)
	type.never<NotNeverType<any>>(false)
})

test('returns never for singular types', () => {
	type.never<NotNeverType<undefined>>(false)
	type.never<NotNeverType<null>>(false)
	type.never<NotNeverType<number>>(false)
	type.never<NotNeverType<boolean>>(false)
	type.never<NotNeverType<true>>(false)
	type.never<NotNeverType<false>>(false)
	type.never<NotNeverType<string>>(false)
	type.never<NotNeverType<''>>(false)
	type.never<NotNeverType<symbol>>(false)
	type.never<NotNeverType<bigint>>(false)
	type.never<NotNeverType<{}>>(false)
	type.never<NotNeverType<string[]>>(false)
	type.never<NotNeverType<[]>>(false)
	type.never<NotNeverType<Function>>(false)
	type.never<NotNeverType<() => void>>(false)
})

it('returns never for union type', () => {
	type.never<NotNeverType<PrimitiveTypes>>(false)
})

it('returns never for intersection type', () => {
	type.never<NotNeverType<{} & {}>>(false)
})

it('can override Then/Else', () => {
	type.equal<NotNeverType<any, 1, 2>, 1>(true)
	type.equal<NotNeverType<unknown, 1, 2>, 1>(true)
	type.equal<NotNeverType<never, 1, 2>, 2>(true)
	type.equal<NotNeverType<void, 1, 2>, 1>(true)
})
