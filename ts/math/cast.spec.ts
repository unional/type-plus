import { testType } from '../index.js'
import type { NumericToString } from '../numeric/cast.js'
import type { MathDeviceToNumeric, StringToMathDevice } from './cast.js'
import { it } from '@jest/globals'

type RoundTrip<N extends number | bigint> = MathDeviceToNumeric<StringToMathDevice<NumericToString<N>>>

it(`keep widen type?`, () => {
	// @ts-expect-error
	testType.equal<RoundTrip<number>, number>(true)
	// @ts-expect-error
	testType.equal<RoundTrip<bigint>, bigint>(true)
})

it('round trip for number', () => {
	testType.equal<RoundTrip<0>, 0>(true)
	testType.equal<RoundTrip<-0>, 0>(true)

	testType.equal<RoundTrip<1>, 1>(true)
	testType.equal<RoundTrip<1234567890>, 1234567890>(true)
	testType.equal<RoundTrip<-1>, -1>(true)
	testType.equal<RoundTrip<-1234567890>, -1234567890>(true)

	testType.equal<RoundTrip<1.234>, 1.234>(true)
	testType.equal<RoundTrip<12.34>, 12.34>(true)
	testType.equal<RoundTrip<0.1234>, 0.1234>(true)
	testType.equal<RoundTrip<0.001234>, 0.001234>(true)

	testType.equal<RoundTrip<-1.234>, -1.234>(true)
	testType.equal<RoundTrip<-12.34>, -12.34>(true)
	testType.equal<RoundTrip<-0.1234>, -0.1234>(true)
	testType.equal<RoundTrip<-0.001234>, -0.001234>(true)
})

it('round trip for bigint', () => {
	testType.equal<RoundTrip<0n>, 0n>(true)
	testType.equal<RoundTrip<-0n>, 0n>(true)

	testType.equal<RoundTrip<1n>, 1n>(true)
	testType.equal<RoundTrip<1234567890n>, 1234567890n>(true)
	testType.equal<RoundTrip<-1n>, -1n>(true)
	testType.equal<RoundTrip<-1234567890n>, -1234567890n>(true)
})
