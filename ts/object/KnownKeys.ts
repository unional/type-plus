// Original by Klaus Meinhardt @ajafff
// known from Gerrit Birkeland @Gerrit0
// https://github.com/Microsoft/TypeScript/issues/25987#issuecomment-408339599

import { PrimitiveTypes } from '../PrimitiveTypes.js'

// https://github.com/microsoft/TypeScript/issues/25987#issuecomment-441224690
export type KnownKeys<T> =
  T extends PrimitiveTypes
  ? never
  : {
    [K in keyof T]: string extends K ? never : number extends K ? never : K
  } extends { [_ in keyof T]: infer U }
  // eslint-disable-next-line @typescript-eslint/ban-types
  ? ({} extends U ? never : U)
  : never
