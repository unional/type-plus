import type { DigitArray } from './Digit'

export type Abs<N extends number, Fail = never> = number extends N ? Fail :
  `${N}` extends `-${infer P}` ? DigitArray.ToNumber<DigitArray.FromString<P>> : N
