import { describe, expect, it } from '@jest/globals'
import { a } from 'assertron'

import { type AnyConstructor, type AnyFunction,assertType, testType } from '../index.js'

describe('assertType()', () => {
	it('input satisfies specified type', () => {
		const subject = { a: 1, b: 2 } as const
		assertType<{ a: 1 }>(subject)
	})
	it('Specify T in the validate function', () => {
		const s: unknown = false
		assertType(s, (s: boolean) => typeof s === 'boolean')
		testType.boolean<typeof s>(true)
	})
	it('Specify T at type declaration', () => {
		const s: unknown = false
		assertType<boolean>(s, s => typeof s === 'boolean')
		testType.boolean<typeof s>(true)
	})
	it('error message contains info from validator', () => {
		const s: unknown = 1
		a.throws(
			() => assertType(s, s => typeof s === 'boolean'),
			e => /subject fails to satisfy s => typeof s === 'boolean'/.test(e)
		)
	})
	it('Class as validator', () => {
		const s: unknown = new Error()
		assertType(s, Error)
		testType.equal<typeof s, Error>(true)
	})
	it('Class as validator fails', () => {
		class Foo {}
		const s: unknown = 1
		a.throws(
			() => assertType(s, Foo),
			(e: Error) => /subject fails to satisfy class Foo{}/.test(e.message)
		)
	})
	it('subject can be type any', () => {
		const s: any = false
		assertType<boolean>(s, s => typeof s === 'boolean')
		testType.boolean<typeof s>(true)
	})
})

describe('assertType.isUndefined()', () => {
	it('ensure the input type is undefined and nothing else', () => {
		assertType.isUndefined(undefined)

		// @ts-expect-error
		assertType.isUndefined(undefined as null)
		// @ts-expect-error
		assertType.isUndefined(undefined as 1)
		// @ts-expect-error
		assertType.isUndefined(undefined as true)
		// @ts-expect-error
		assertType.isUndefined(undefined as 'a')
		// @ts-expect-error
		assertType.isUndefined(undefined as [])
		// @ts-expect-error
		assertType.isUndefined(undefined as {})
		// @ts-expect-error
		assertType.isUndefined(undefined as undefined | number)
		// @ts-expect-error
		assertType.isUndefined(undefined as unknown)
	})
	it('not undefined throws TypeError', () => {
		a.throws(() => assertType.isUndefined(1 as any), TypeError)
	})
	it('narrow any to undefined', () => {
		const x: any = undefined
		assertType.isUndefined(x)
		testType.undefined<typeof x>(true)
	})
})

describe('assertType.noUndefined()', () => {
	it('ensure the input type does not contain undefined', () => {
		assertType.noUndefined(null)
		assertType.noUndefined(1)
		assertType.noUndefined(true)
		assertType.noUndefined('a')
		assertType.noUndefined([])
		assertType.noUndefined({})
		assertType.noUndefined(1 as unknown)

		// @ts-expect-error
		assertType.noUndefined(1 as undefined)
		// @ts-expect-error
		assertType.noUndefined(1 as undefined | number)
	})
	it('undefined throws TypeError', () => {
		a.throws(() => assertType.noUndefined(undefined as any), TypeError)
	})
})

describe('assertType.isNull()', () => {
	it('ensure the input type is null and nothing else', () => {
		assertType.isNull(null)

		a.throws(() => assertType.isNull(1 as any), TypeError)
		const x: any = null
		assertType.isNull(x)
		// `x` is narrowed to `null` here
		assertType.isNull(x)

		// @ts-expect-error
		assertType.isNull(null as undefined)
		// @ts-expect-error
		assertType.isNull(null as 1)
		// @ts-expect-error
		assertType.isNull(null as true)
		// @ts-expect-error
		assertType.isNull(null as 'a')
		// @ts-expect-error
		assertType.isNull(null as [])
		// @ts-expect-error
		assertType.isNull(null as {})
		// @ts-expect-error
		assertType.isNull(null as null | undefined)
		// @ts-expect-error
		assertType.isNull(null as unknown)
	})
	it('not null throws TypeError', () => {
		a.throws(() => assertType.isNull(1 as any), TypeError)
	})
	it('narrow any to null', () => {
		const x: any = null
		assertType.isNull(x)
		testType.null<typeof x>(true)
	})
})

describe('assertType.noNull()', () => {
	it('ensure the input type does not contain null', () => {
		assertType.noNull(undefined)
		assertType.noNull(1)
		assertType.noNull(true)
		assertType.noNull('a')
		assertType.noNull([])
		assertType.noNull({})

		// @ts-expect-error
		assertType.noNull(1 as null)
		// @ts-expect-error
		assertType.noNull(undefined as undefined | null)
	})
	it('null throws TypeError', () => {
		a.throws(() => assertType.noNull(null as any), TypeError)
	})
})

describe('assertType.isNumber()', () => {
	it('ensure the input type is number and nothing else', () => {
		assertType.isNumber(0)

		// @ts-expect-error
		assertType.isNumber(1 as undefined)
		// @ts-expect-error
		assertType.isNumber(1 as null)
		// @ts-expect-error
		assertType.isNumber(1 as true)
		// @ts-expect-error
		assertType.isNumber(1 as 'a')
		// @ts-expect-error
		assertType.isNumber(1 as [])
		// @ts-expect-error
		assertType.isNumber(1 as {})
		// @ts-expect-error
		assertType.isNumber(1 as number | undefined)
		// @ts-expect-error
		assertType.isNumber(1 as unknown)
	})
	it('not number throws TypeError', () => {
		a.throws(() => assertType.isNumber(undefined as any), TypeError)
	})
	it('narrow any to number', () => {
		const x: any = 1
		assertType.isNumber(x)
		testType.number<typeof x>(true)
	})
})

describe('assertType.noNumber()', () => {
	it('ensure the input type does not contain number', () => {
		assertType.noNumber(undefined)
		assertType.noNumber(null)
		assertType.noNumber(true)
		assertType.noNumber('a')
		assertType.noNumber([])
		assertType.noNumber({})

		// @ts-expect-error
		assertType.noNumber('' as 1)
		// @ts-expect-error
		assertType.noNumber('' as number | undefined)
	})
	it('number throws TypeError', () => {
		a.throws(() => assertType.noNumber(1 as any), TypeError)
	})
})

describe('assertType.isBoolean()', () => {
	it('ensure the input type is boolean and nothing else', () => {
		assertType.isBoolean(true)
		assertType.isBoolean(false)

		// @ts-expect-error
		assertType.isBoolean(false as undefined)
		// @ts-expect-error
		assertType.isBoolean(false as null)
		// @ts-expect-error
		assertType.isBoolean(false as 1)
		// @ts-expect-error
		assertType.isBoolean(false as 'a')
		// @ts-expect-error
		assertType.isBoolean(false as [])
		// @ts-expect-error
		assertType.isBoolean(false as {})
		// @ts-expect-error
		assertType.isBoolean(true as boolean | undefined)
	})
	it('not boolean throws TypeError', () => {
		a.throws(() => assertType.isBoolean(undefined as any), TypeError)
	})
	it('narrow any to boolean', () => {
		const x: any = true
		assertType.isBoolean(x)
		testType.boolean<typeof x>(true)
	})
})

describe('assertType.noBoolean()', () => {
	it('ensure the input type does not contain boolean', () => {
		assertType.noBoolean(undefined)
		assertType.noBoolean(null)
		assertType.noBoolean(1)
		assertType.noBoolean('a')
		assertType.noBoolean([])
		assertType.noBoolean({})

		// @ts-expect-error
		assertType.noBoolean(1 as true)
		// @ts-expect-error
		assertType.noBoolean(1 as boolean | undefined)
	})
	it('boolean throws TypeError', () => {
		a.throws(() => assertType.noBoolean(true as any), TypeError)
	})
})

describe('assertType.isTrue()', () => {
	it('ensure the input type is true and nothing else', () => {
		assertType.isTrue(true)

		// @ts-expect-error
		assertType.isTrue(true as undefined)
		// @ts-expect-error
		assertType.isTrue(true as null)
		// @ts-expect-error
		assertType.isTrue(true as 1)
		// @ts-expect-error
		assertType.isTrue(true as 'a')
		// @ts-expect-error
		assertType.isTrue(true as false)
		// @ts-expect-error
		assertType.isTrue(true as [])
		// @ts-expect-error
		assertType.isTrue(true as {})
		// @ts-expect-error
		assertType.isTrue(true as true | undefined)
		// @ts-expect-error
		assertType.isTrue(true as unknown)
	})
	it('not true throws TypeError', () => {
		a.throws(() => assertType.isTrue(undefined as any), TypeError)
	})
	it('narrow any to true', () => {
		const x: any = true
		assertType.isTrue(x)
		testType.true<typeof x>(true)
	})
})

describe('assertType.noTrue()', () => {
	it('ensure the input type does not contain boolean', () => {
		assertType.noTrue(false)
		assertType.noTrue(undefined)
		assertType.noTrue(null)
		assertType.noTrue(1)
		assertType.noTrue('a')
		assertType.noTrue([])
		assertType.noTrue({})

		// @ts-expect-error
		assertType.noTrue(1 as true)
		// @ts-expect-error
		assertType.noTrue(1 as true | undefined)
		// @ts-expect-error
		assertType.noTrue(1 as boolean | undefined)
	})
	it('true throws TypeError', () => {
		a.throws(() => assertType.noTrue(true as any), TypeError)
	})
})

describe('assertType.isFalse()', () => {
	it('ensure the input type is false and nothing else', () => {
		assertType.isFalse(false)

		a.throws(() => assertType.isFalse(true as any), TypeError)
		const x: any = false
		assertType.isFalse(x)
		// `x` is narrowed to `true` here
		assertType.isFalse(x)
		assertType.isFalse(false)

		// @ts-expect-error
		assertType.isFalse(false as undefined)
		// @ts-expect-error
		assertType.isFalse(false as null)
		// @ts-expect-error
		assertType.isFalse(false as 1)
		// @ts-expect-error
		assertType.isFalse(false as 'a')
		// @ts-expect-error
		assertType.isFalse(false as true)
		// @ts-expect-error
		assertType.isFalse(false as [])
		// @ts-expect-error
		assertType.isFalse(false as {})
		// @ts-expect-error
		assertType.isFalse(false as false | undefined)
		// @ts-expect-error
		assertType.isFalse(false as unknown)
	})
	it('boolean throws TypeError', () => {
		a.throws(() => assertType.noBoolean(true as any), TypeError)
	})
})

describe('assertType.noFalse()', () => {
	it('ensure the input type does not contain boolean', () => {
		assertType.noFalse(true)
		assertType.noFalse(undefined)
		assertType.noFalse(null)
		assertType.noFalse(1)
		assertType.noFalse('a')
		assertType.noFalse([])
		assertType.noFalse({})

		// @ts-expect-error
		assertType.noFalse(1 as false)
		// @ts-expect-error
		assertType.noFalse(1 as false | undefined)
		// @ts-expect-error
		assertType.noFalse(1 as boolean | undefined)
	})
	it('false throws TypeError', () => {
		a.throws(() => assertType.noFalse(false as any), TypeError)
	})
})

describe('assertType.isString()', () => {
	it('ensure the input type is string and nothing else', () => {
		assertType.isString('a')

		// @ts-expect-error
		assertType.isString('a' as undefined)
		// @ts-expect-error
		assertType.isString('a' as null)
		// @ts-expect-error
		assertType.isString('a' as 1)
		// @ts-expect-error
		assertType.isString('a' as true)
		// @ts-expect-error
		assertType.isString('a' as [])
		// @ts-expect-error
		assertType.isString('a' as {})
		// @ts-expect-error
		assertType.isString('a' as string | undefined)
		// @ts-expect-error
		assertType.isString('a' as unknown)
	})
	it('not string throws TypeError', () => {
		a.throws(() => assertType.isString(undefined as any), TypeError)
	})
	it('narrow any to string', () => {
		const x: any = ''
		assertType.isString(x)
		testType.string<typeof x>(true)
	})
})

describe('assertType.noString()', () => {
	it('ensure the input type does not contain boolean', () => {
		assertType.noString(undefined)
		assertType.noString(null)
		assertType.noString(1)
		assertType.noString(true)
		assertType.noString([])
		assertType.noString({})

		// @ts-expect-error
		assertType.noString(1 as 'a')
		// @ts-expect-error
		assertType.noString(1 as 'a' as string | undefined)
	})
	it('string throws TypeError', () => {
		a.throws(() => assertType.noString('' as any), TypeError)
	})
})

describe('assertType.isFunction()', () => {
	it('ensure the input type is function and nothing else', () => {
		assertType.isFunction(() => {})
		assertType.isFunction(() => {})

		const f = () => {}
		// @ts-expect-error
		assertType.isFunction(f as undefined)
		// @ts-expect-error
		assertType.isFunction(f as null)
		// @ts-expect-error
		assertType.isFunction(f as 1)
		// @ts-expect-error
		assertType.isFunction(f as 'a')
		// @ts-expect-error
		assertType.isFunction(f as [])
		// @ts-expect-error
		assertType.isFunction(f as {})
		// @ts-expect-error
		assertType.isFunction(f as AnyFunction | undefined)
	})
	it('not function throws TypeError', () => {
		a.throws(() => assertType.isFunction(undefined as any), TypeError)
	})
	it('narrow any to function', () => {
		const x: any = () => {}
		assertType.isFunction(x)
		testType.function<typeof x>(true)
	})
})

describe('assertType.noFunction()', () => {
	it('ensure the input type does not contain function', () => {
		assertType.noFunction(undefined)
		assertType.noFunction(null)
		assertType.noFunction(1)
		assertType.noFunction('a')
		assertType.noFunction([])
		assertType.noFunction({})

		// @ts-expect-error
		assertType.noFunction(1 as () => void)
		// @ts-expect-error
		assertType.noFunction(1 as AnyFunction | undefined)
	})
	it('function throws TypeError', () => {
		a.throws(() => assertType.noFunction((() => {}) as any), TypeError)
	})
})

describe('assertType.isConstructor()', () => {
	it('ensure the input type is constructor and nothing else', () => {
		class Foo {}
		assertType.isConstructor(Foo)

		// @ts-expect-error
		assertType.isConstructor(Foo as () => void)
		// @ts-expect-error
		assertType.isConstructor(Foo as undefined)
		// @ts-expect-error
		assertType.isConstructor(Foo as null)
		// @ts-expect-error
		assertType.isConstructor(Foo as 1)
		// @ts-expect-error
		assertType.isConstructor(Foo as 'a')
		// @ts-expect-error
		assertType.isConstructor(Foo as [])
		// @ts-expect-error
		assertType.isConstructor(Foo as {})
		// @ts-expect-error
		assertType.isConstructor(Foo as AnyFunction | undefined)
	})
	it('not constructor throws TypeError', () => {
		a.throws(() => assertType.isConstructor(undefined as any), TypeError)
	})
	it('narrow any to constructor', () => {
		class Foo {}
		const x: any = Foo
		assertType.isConstructor(x)
		testType.equal<typeof x, AnyConstructor>(true)
	})
})

describe('assertType.isError()', () => {
	it('ensure the input type is instance of Error and nothing else', () => {
		assertType.isError(new Error('x'))

		a.throws(() => assertType.isError(false as any), TypeError)
		const x: any = new Error()
		assertType.isError(x)
		// `x` is narrowed to `true` here
		assertType.isError(x)

		// @ts-expect-error
		assertType.isError(x as undefined)
		// @ts-expect-error
		assertType.isError(x as null)
		// @ts-expect-error
		assertType.isError(x as 1)
		// @ts-expect-error
		assertType.isError(x as true)
		// @ts-expect-error
		assertType.isError(x as [])
		// @ts-expect-error
		assertType.isError(x as {})
		// @ts-expect-error
		assertType.isError(x as 'a')
		// @ts-expect-error
		assertType.isError(x as Error | undefined)
		// @ts-expect-error
		assertType.isError(x as unknown)
	})

	it('not error throws TypeError', () => {
		a.throws(() => assertType.isError(undefined as any), TypeError)
	})
	it('narrow any to Error', () => {
		const x: any = new Error('hello')
		assertType.isError(x)
		testType.equal<typeof x, Error>(true)
	})
})

describe('assertType.noError()', () => {
	it('ensure the input type does not contain Error', () => {
		assertType.noError(undefined)
		assertType.noError(null)
		assertType.noError(1)
		assertType.noError('a')
		assertType.noError([])
		assertType.noError({})

		// @ts-expect-error
		assertType.noError({} as Error)
		// @ts-expect-error
		assertType.noError({} as Error | undefined)
	})
	it('error instance throws TypeError', () => {
		a.throws(() => assertType.noError(new Error('a') as any), TypeError)
	})
})

describe('assertType.isNever()', () => {
	it('ensure the input type is never and nothing else', () => {
		const s: never = 0 as never
		assertType.isNever(s)

		// @ts-expect-error
		assertType.isNever(undefined)
		// @ts-expect-error
		assertType.isNever(null)
		// @ts-expect-error
		assertType.isNever(1)
		// @ts-expect-error
		assertType.isNever('a')
		// @ts-expect-error
		assertType.isNever(false)
		// @ts-expect-error
		assertType.isNever([])
		// @ts-expect-error
		assertType.isNever({})
		// @ts-expect-error
		assertType.isNever(1 as any)
		// @ts-expect-error
		assertType.isNever(false as never | undefined)
		// @ts-expect-error
		assertType.isNever(false as unknown)
	})
	it('boolean throws TypeError', () => {
		a.throws(() => assertType.noBoolean(true as any), TypeError)
	})
})

describe('assertType.custom', () => {
	it('specify T in the validator', () => {
		const isBool = assertType.custom((s: boolean) => typeof s === 'boolean')
		const s: unknown = false
		expect(isBool(s)).toBe(undefined)
	})
	it('specify T at type declaration', () => {
		const isBool = assertType.custom<boolean>(s => typeof s === 'boolean')
		const s: unknown = false
		expect(isBool(s)).toBe(undefined)
	})
	it('error message contains info from validator', () => {
		const isBool = assertType.custom<boolean>(s => typeof s === 'boolean')
		const s: unknown = 1
		a.throws(
			() => isBool(s),
			e => /subject fails to satisfy s => typeof s === 'boolean'/.test(e)
		)
	})
})

describe('assertType.as<T>()', () => {
	it('assert the subject as T', () => {
		let s: string | undefined
		assertType.as<string>(s)
		testType.string<typeof s>(true)
	})

	it('narrows to literal', () => {
		const s: number | undefined = 1
		assertType.as<1>(s)
		testType.equal<typeof s, 1>(true)
	})
})
