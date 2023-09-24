import { it } from '@jest/globals'
import { testType, type $NotNever, type NeverType } from '../index.js'

it('returns never if T is never', () => {
	testType.equal<NeverType<never>, never>(true)
})

it('returns $NotNever for other special types', () => {
	testType.equal<NeverType<unknown>, $NotNever>(true)
	testType.equal<NeverType<void>, $NotNever>(true)
	testType.equal<NeverType<any>, $NotNever>(true)
})

it('returns $NotNever for other types', () => {
	testType.equal<NeverType<undefined>, $NotNever>(true)
	testType.equal<NeverType<null>, $NotNever>(true)
	testType.equal<NeverType<number>, $NotNever>(true)
	testType.equal<NeverType<boolean>, $NotNever>(true)
	testType.equal<NeverType<true>, $NotNever>(true)
	testType.equal<NeverType<false>, $NotNever>(true)
	testType.equal<NeverType<string>, $NotNever>(true)
	testType.equal<NeverType<''>, $NotNever>(true)
	testType.equal<NeverType<symbol>, $NotNever>(true)
	testType.equal<NeverType<bigint>, $NotNever>(true)
	testType.equal<NeverType<{}>, $NotNever>(true)
	testType.equal<NeverType<string[]>, $NotNever>(true)
	testType.equal<NeverType<[]>, $NotNever>(true)
	testType.equal<NeverType<Function>, $NotNever>(true)
	testType.equal<NeverType<() => void>, $NotNever>(true)
})

it('returns $NotNever for union type', () => {
	testType.equal<NeverType<never | 1>, $NotNever>(true)
})

it('returns never for intersection type', () => {
	// TypeScript resolve this to `never` automatically,
	// so `NeverType<>` actually does not do anthing in this case.
	testType.never<never & { a: 1 }>(true)
	testType.never<NeverType<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NeverType<never, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<NeverType<0, { $then: 1, $else: 2 }>, 2>(true)

	testType.equal<NeverType<any, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<NeverType<unknown, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<NeverType<void, { $then: 1, $else: 2 }>, 2>(true)
})

it('supports partial customization', () => {
	testType.equal<NeverType<never, { $else: 2 }>, never>(true)
	testType.equal<NeverType<0, { $then: 1 }>, $NotNever>(true)
})
