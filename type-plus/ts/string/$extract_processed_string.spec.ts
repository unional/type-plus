import { it } from '@jest/globals'
import { testType } from '../index.js'
import { type $ExtractProcessedString } from './$extract_processed_string.js'

it('returns T if T is a string', () => {
	testType.equal<$ExtractProcessedString<string>, string>(true)
})

it(`returns T if T is a string literal`, () => {
	testType.equal<$ExtractProcessedString<''>, ''>(true)
	testType.equal<$ExtractProcessedString<'a'>, 'a'>(true)
})

it('returns T if T can be reduced to a string literal', () => {
	testType.equal<$ExtractProcessedString<`${''}`>, ''>(true)
	testType.equal<$ExtractProcessedString<`${'b'}`>, 'b'>(true)
	testType.equal<$ExtractProcessedString<`${boolean}`>, `true` | `false`>(true)
	testType.equal<$ExtractProcessedString<`${true}`>, `true`>(true)
	testType.equal<$ExtractProcessedString<`${false}`>, `false`>(true)
	testType.equal<$ExtractProcessedString<`${1}`>, `1`>(true)
	testType.equal<$ExtractProcessedString<`${1.1}`>, `1.1`>(true)
	testType.equal<$ExtractProcessedString<`${1e99}`>, `1e+99`>(true)
	testType.equal<$ExtractProcessedString<`${-1}`>, `-1`>(true)
	testType.equal<$ExtractProcessedString<`${1n}`>, `1`>(true)
	testType.equal<$ExtractProcessedString<`${null}`>, `null`>(true)
	testType.equal<$ExtractProcessedString<`${undefined}`>, `undefined`>(true)
})


it('returns T for template literal', () => {
	testType.equal<$ExtractProcessedString<`${number}`>, `${number}`>(true)
	testType.equal<$ExtractProcessedString<`${string}`>, string>(true)
	testType.equal<$ExtractProcessedString<`${bigint}`>, `${bigint}`>(true)

	testType.equal<$ExtractProcessedString<`a${number}`>, `a${number}`>(true)
	testType.equal<$ExtractProcessedString<`a${string}`>, `a${string}`>(true)
	testType.equal<$ExtractProcessedString<`a${bigint}`>, `a${bigint}`>(true)

	testType.equal<$ExtractProcessedString<`${number}c`>, `${number}c`>(true)
	testType.equal<$ExtractProcessedString<`${string}c`>, `${string}c`>(true)
	testType.equal<$ExtractProcessedString<`${bigint}c`>, `${bigint}c`>(true)

	testType.equal<$ExtractProcessedString<`a${number}c`>, `a${number}c`>(true)
	testType.equal<$ExtractProcessedString<`a${string}c`>, `a${string}c`>(true)
	testType.equal<$ExtractProcessedString<`a${bigint}c`>, `a${bigint}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractProcessedString<`${number | string | bigint}`>, string>(true)
	testType.equal<$ExtractProcessedString<`${number | bigint}`>, `${number | bigint}`>(true)
	testType.equal<$ExtractProcessedString<`a${number | string | bigint}`>, `a${number | string | bigint}`>(true)
	testType.equal<$ExtractProcessedString<`${number | string | bigint}c`>, `${number | string | bigint}c`>(true)
	testType.equal<$ExtractProcessedString<`a${number | string | bigint}c`>, `a${number | string | bigint}c`>(true)
})

it('unwraps T in Uppercase', () => {
	testType.equal<$ExtractProcessedString<Uppercase<string>>, string>(true)

	testType.equal<$ExtractProcessedString<Uppercase<''>>, ''>(true)
	testType.equal<$ExtractProcessedString<Uppercase<'a'>>, 'A'>(true)

	testType.equal<$ExtractProcessedString<Uppercase<`${''}`>>, ''>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${'b'}`>>, 'B'>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${boolean}`>>, `TRUE` | `FALSE`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${true}`>>, `TRUE`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${false}`>>, `FALSE`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${1}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${1e99}`>>, `1E+99`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${null}`>>, `NULL`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${undefined}`>>, `UNDEFINED`>(true)

	testType.equal<$ExtractProcessedString<Uppercase<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${string}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractProcessedString<Uppercase<`a${number}`>>, `A${Uppercase<`${number}`>}`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`a${string}`>>, `A${Uppercase<`${string}`>}`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`a${bigint}`>>, `A${Uppercase<`${bigint}`>}`>(true)

	testType.equal<$ExtractProcessedString<Uppercase<`${number}c`>>, `${Uppercase<`${number}`>}C`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${string}c`>>, `${Uppercase<`${string}`>}C`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${bigint}c`>>, `${Uppercase<`${bigint}`>}C`>(true)

	testType.equal<$ExtractProcessedString<Uppercase<`a${number}c`>>, `A${Uppercase<`${number}`>}C`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`a${string}c`>>, `A${Uppercase<`${string}`>}C`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`a${bigint}c`>>, `A${Uppercase<`${bigint}`>}C`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`a${number | string | bigint}`>>, `A${Uppercase<`${number | string | bigint}`>}`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`${number | string | bigint}c`>>, `${Uppercase<`${number | string | bigint}`>}C`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<`a${number | string | bigint}c`>>, `A${Uppercase<`${number | string | bigint}`>}C`>(true)
})

it('unwraps T in Lowercase', () => {
	testType.equal<$ExtractProcessedString<Lowercase<string>>, string>(true)

	testType.equal<$ExtractProcessedString<Lowercase<''>>, ''>(true)
	testType.equal<$ExtractProcessedString<Lowercase<'a'>>, 'a'>(true)

	testType.equal<$ExtractProcessedString<Lowercase<`${''}`>>, ''>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${'b'}`>>, 'b'>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${boolean}`>>, `true` | `false`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${true}`>>, `true`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${false}`>>, `false`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${1}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${1e99}`>>, `1e+99`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${null}`>>, `null`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${undefined}`>>, `undefined`>(true)

	testType.equal<$ExtractProcessedString<Lowercase<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${string}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractProcessedString<Lowercase<`a${number}`>>, `a${Lowercase<`${number}`>}`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`a${string}`>>, `a${Lowercase<`${string}`>}`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`a${bigint}`>>, `a${Lowercase<`${bigint}`>}`>(true)

	testType.equal<$ExtractProcessedString<Lowercase<`${number}c`>>, `${Lowercase<`${number}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${string}c`>>, `${Lowercase<`${string}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${bigint}c`>>, `${Lowercase<`${bigint}`>}c`>(true)

	testType.equal<$ExtractProcessedString<Lowercase<`a${number}c`>>, `a${Lowercase<`${number}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`a${string}c`>>, `a${Lowercase<`${string}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`a${bigint}c`>>, `a${Lowercase<`${bigint}`>}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`a${number | string | bigint}`>>, `a${Lowercase<`${number | string | bigint}`>}`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`${number | string | bigint}c`>>, `${Lowercase<`${number | string | bigint}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Lowercase<`a${number | string | bigint}c`>>, `a${Lowercase<`${number | string | bigint}`>}c`>(true)
})

it('unwraps T in Capitalize', () => {
	testType.equal<$ExtractProcessedString<Capitalize<string>>, string>(true)

	testType.equal<$ExtractProcessedString<Capitalize<''>>, ''>(true)
	testType.equal<$ExtractProcessedString<Capitalize<'a'>>, 'A'>(true)
	testType.equal<$ExtractProcessedString<Capitalize<'hello world'>>, 'Hello world'>(true)

	testType.equal<$ExtractProcessedString<Capitalize<`${''}`>>, ''>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${'b'}`>>, 'B'>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${boolean}`>>, `True` | `False`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${true}`>>, `True`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${false}`>>, `False`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${1}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${1e99}`>>, `1e+99`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${null}`>>, `Null`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${undefined}`>>, `Undefined`>(true)

	testType.equal<$ExtractProcessedString<Capitalize<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${string}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractProcessedString<Capitalize<`a${number}`>>, `A${number}`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`a${string}`>>, `A${string}`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`a${bigint}`>>, `A${bigint}`>(true)

	testType.equal<$ExtractProcessedString<Capitalize<`${number}c`>>, `${Capitalize<`${number}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${string}c`>>, `${Capitalize<`${string}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${bigint}c`>>, `${Capitalize<`${bigint}`>}c`>(true)

	testType.equal<$ExtractProcessedString<Capitalize<`a${number}c`>>, `A${number}c`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`a${string}c`>>, `A${string}c`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`a${bigint}c`>>, `A${bigint}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`a${number | string | bigint}`>>, `A${number | string | bigint}`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`${number | string | bigint}c`>>, `${Capitalize<`${number | string | bigint}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Capitalize<`a${number | string | bigint}c`>>, `A${number | string | bigint}c`>(true)
})

it('unwraps T in Uncapitalize', () => {
	testType.equal<$ExtractProcessedString<Uncapitalize<string>>, string>(true)

	testType.equal<$ExtractProcessedString<Uncapitalize<''>>, ''>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<'ABC'>>, 'aBC'>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<'HELLO WORLD'>>, 'hELLO WORLD'>(true)

	testType.equal<$ExtractProcessedString<Uncapitalize<`${''}`>>, ''>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${'b'}`>>, 'b'>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${boolean}`>>, `true` | `false`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${true}`>>, `true`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${false}`>>, `false`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${1}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${1e99}`>>, `1e+99`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${null}`>>, `null`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${undefined}`>>, `undefined`>(true)

	testType.equal<$ExtractProcessedString<Uncapitalize<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${string}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractProcessedString<Uncapitalize<`a${number}`>>, `a${number}`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`a${string}`>>, `a${string}`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`a${bigint}`>>, `a${bigint}`>(true)

	testType.equal<$ExtractProcessedString<Uncapitalize<`${number}c`>>, `${Uncapitalize<`${number}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${string}c`>>, `${Uncapitalize<`${string}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${bigint}c`>>, `${Uncapitalize<`${bigint}`>}c`>(true)

	testType.equal<$ExtractProcessedString<Uncapitalize<`a${number}c`>>, `a${number}c`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`a${string}c`>>, `a${string}c`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`a${bigint}c`>>, `a${bigint}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`a${number | string | bigint}`>>, `a${number | string | bigint}`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`${number | string | bigint}c`>>, `${Uncapitalize<`${number | string | bigint}`>}c`>(true)
	testType.equal<$ExtractProcessedString<Uncapitalize<`a${number | string | bigint}c`>>, `a${number | string | bigint}c`>(true)
})

it('unwraps nested T', () => {
	testType.equal<$ExtractProcessedString<Uppercase<Lowercase<Capitalize<Uncapitalize<'ABC'>>>>>, 'ABC'>(true)

	testType.equal<$ExtractProcessedString<Uppercase<Lowercase<Capitalize<Uncapitalize<`${number}`>>>>>, `${number}`>(true)
	testType.equal<$ExtractProcessedString<Uppercase<Lowercase<Capitalize<Uncapitalize<`a${number}`>>>>>, `A${Uppercase<Lowercase<`${number}`>>}`>(true)
})
